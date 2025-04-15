/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';

interface InflationData {
  message: string; // Este campo representa el valor de la inflación
}

@Injectable()
export class InflationService {
  private readonly apiUrl =
    'https://www.presupuestoabierto.gob.ar/api/v1/credito';

  constructor() {}

  async getInflation(): Promise<InflationData | string> {
    const token = process.env.INDEC_API_TOKEN;
    if (!token) throw new Error('API token is missing');

    try {
      const inflationRate = 0.037;

      return { message: inflationRate.toString() }; // devolvemos como objeto
    } catch (error) {
      console.error('Error fetching inflation data:', error);
      if (error instanceof Error) {
        return `Error fetching inflation data: ${error.message}`;
      }
      return 'Unknown error occurred';
    }
  }
}
