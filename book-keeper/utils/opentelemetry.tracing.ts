// tracing.ts

import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { SimpleSpanProcessor, BatchSpanProcessor, ConsoleSpanExporter, TraceIdRatioBasedSampler } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { trace, Tracer } from "@opentelemetry/api";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { PrismaInstrumentation } from "@prisma/instrumentation";
import { JaegerExporter } from "@opentelemetry/exporter-jaeger";

/**
 * @desc opentelemetry trace intializer 
 * @includes prisma instrumentation registered with opentelemetry for automated instrumentation
 * */
export default function initializeTracing(serviceName: string): Tracer {

    /**✨ probability sampling to reduce traces & spans via traceRatio in production env reff: https://opentelemetry.io/docs/reference/specification/trace/tracestate-probability-sampling/ */
    // ref: https://opentelemetry.io/docs/reference/specification/trace/sdk/#traceidratiobased
    const traceRatio = process.env.NODE_ENV === 'production' ? 0.1 : 1.0;
    const provider = new NodeTracerProvider({
        sampler: new TraceIdRatioBasedSampler(traceRatio),
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
        }),
    });

    const consoleExporter = new ConsoleSpanExporter();
    /**💡 uncomment to see traces in jaeger */
    // const jaegerExporter = new JaegerExporter({
    //     endpoint: "http://localhost:14268/api/traces",
    // });
    
    /** ✨ switch to batchSpanProcessor to avoid bad performance impacts in production env */
    if (process.env.NODE_ENV === 'production') {
        provider.addSpanProcessor(new BatchSpanProcessor(consoleExporter))
        /**💡 uncomment to see traces in jaeger */
        // provider.addSpanProcessor(new BatchSpanProcessor(jaegerExporter));
    } else {
        provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter))
        /**💡 uncomment to see traces in jaeger */
        // provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
    }

    // registering prisma instrumentation library with open telemetry to generate and gather traces on prisma queries automatically
    registerInstrumentations({
        instrumentations: [
            new PrismaInstrumentation()
        ],
        tracerProvider: provider,
    });

    provider.register();

    return trace.getTracer(serviceName);

};


// ✨ sample-trace-object for trpc mutation update-email-phone span, visible in console
// {
//     traceId: '0f1d8beed35d527a54b17711c9e7529c',
//     parentId: undefined,
//     name: 'updateEmailPhone-span',
//     id: '1979d39ce10c96e1',
//     kind: 0,
//     timestamp: 1673355177088949,
//     duration: 205570,
//     attributes: { 'http.status': 200 },
//     status: { code: 0 },
//     events: [],
//     links: []
// }