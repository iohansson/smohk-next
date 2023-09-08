'use client';

import type { Config } from '@/modules/config/Config.model';
import { postConfig } from '@/modules/config/Config.actions';

export function ConfigForm(props: { config: Config; smoker: string }) {
  const { interval, packPrice, packAmount } = props.config;
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-[#00000033]">
      <form
        action={(formData) =>
          postConfig(
            { smoker: props.smoker },
            Object.fromEntries(formData.entries()) as unknown as Config,
          )
        }
      >
        <fieldset>
          <label>Interval</label>
          <input name="interval" type="number" defaultValue={interval} />
        </fieldset>
        <fieldset>
          <label>Pack price</label>
          <input
            name="packPrice"
            type="number"
            step={0.1}
            defaultValue={packPrice}
          />
        </fieldset>
        <fieldset>
          <label>Pack amount</label>
          <input
            name="packAmount"
            type="number"
            step={1}
            defaultValue={packAmount}
          />
        </fieldset>

        <button type="submit">save</button>
      </form>
    </div>
  );
}
