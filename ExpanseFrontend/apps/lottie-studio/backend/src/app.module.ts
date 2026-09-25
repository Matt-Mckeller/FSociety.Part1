import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { join } from "path"
import { LottieModule } from "./lottie/lottie.module"
import { AiModule } from "./ai/ai.module"
import { ExportModule } from "./export/export.module"
import { PubSubModule } from "./common/pubsub.module"

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
    }),

    // GraphQL configuration with schema-first approach
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [join(__dirname, "schema.graphql")],
      playground: true,
      subscriptions: {
        "graphql-ws": true,
        "subscriptions-transport-ws": true,
      },
    }),

    // Feature modules
    PubSubModule,
    AiModule,
    ExportModule,
    LottieModule,
  ],
})
export class AppModule {}
