'use client';

import type { Config } from '@/modules/config/Config.model';
import { postConfig } from '@/modules/config/Config.actions';

export function ConfigForm(props: { config: Config; smoker: string }) {
  const { interval, packPrice, packAmount } = props.config;

  return (
    <form
      action={(formData) =>
        postConfig(
          { smoker: props.smoker },
          Object.fromEntries(formData.entries()) as unknown as Config,
        )
      }
      className="flex flex-col gap-4 py-4"
    >
      <fieldset className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Interval</span>
        </label>
        <input
          name="interval"
          type="number"
          defaultValue={interval}
          className="input input-bordered"
        />
      </fieldset>
      <fieldset className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Pack price</span>
        </label>
        <input
          name="packPrice"
          type="number"
          step={0.1}
          defaultValue={packPrice}
          className="input input-bordered"
        />
      </fieldset>
      <fieldset className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Pack amount</span>
        </label>
        <input
          name="packAmount"
          type="number"
          step={1}
          defaultValue={packAmount}
          className="input input-bordered"
        />
      </fieldset>

      <button type="submit" className="btn btn-primary mt-4 max-w-xs">
        Save
      </button>
    </form>
  );
}
