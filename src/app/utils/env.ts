import { z } from 'zod';

const envSchema = z.object({
  NOTION_SECRET: z.string().nonempty(),
  NOTION_DATABASE_ID: z.string().nonempty(),
});

const validateEnv = () => {
  try {
    const validatedEnv = envSchema.parse(process.env);
    return Object.freeze(validatedEnv);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => {
        return `- ${err.path.join('.')}: ${err.message}`;
      });

      console.error('Environment Variable Validation Failed:');
      console.error(errorMessages.join('\n'));
    } else {
      console.error('Unknown error during environment validation:', error);
    }

    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    } else {
      throw new Error('Environment variable validation failed');
    }
  }
};

export const env = validateEnv();
