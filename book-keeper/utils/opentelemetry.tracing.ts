// tracing.ts

import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { SimpleSpanProcessor, ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { trace, Tracer } from "@opentelemetry/api";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { PrismaInstrumentation } from "@prisma/instrumentation";

/**
 * @desc opentelemetry trace intializer 
 * @includes prisma instrumentation registered with opentelemetry for automated instrumentation
 * */
export default function initializeTracing(serviceName: string): Tracer {

    const provider = new NodeTracerProvider({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
        }),
    });

    const consoleExporter = new ConsoleSpanExporter()
    provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));

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


// ✨ sample-trace-object, visible in console
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