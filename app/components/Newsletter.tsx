import { Form } from '@remix-run/react';

export const Newsletter = () => {
  return (
    <div className="text-primary">
      <Form method="post">
        <fieldset className="">
          <legend className="text-[10px] uppercase mb-2">
            Subscribe to our newsletter
          </legend>
          <label htmlFor="email" className="block text-sm">
            Email adress*
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="mb-2 placeholder:text-slate-400 border border-slate-300 rounded-sm"
          />
          <button className="button block text-xs w-full" type="submit">
            Subscribe
          </button>
        </fieldset>
      </Form>
    </div>
  );
};
