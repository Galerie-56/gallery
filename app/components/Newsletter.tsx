import { Form, useActionData, useNavigation } from '@remix-run/react';
import { useEffect, useRef } from 'react';

export const Newsletter = () => {
  const actionData = useActionData<{ message?: string; error?: string }>();
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (navigation.state === 'idle' && actionData && formRef.current) {
      formRef.current.reset();
    }
  }, [navigation.state, actionData]);

  return (
    <div className="text-primary">
      <Form method="post" className="md:w-[300px]" ref={formRef}>
        <fieldset className="">
          <legend className="text-[10px] uppercase mb-2">
            Subscribe to our newsletter
          </legend>
          <label htmlFor="email" className="block text-sm">
            Email address*
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            className="mb-2 placeholder:text-slate-400 border border-slate-300 rounded-sm w-full"
          />
          <button className="button block text-xs w-full pt-3" type="submit">
            Subscribe
          </button>
        </fieldset>
      </Form>
      {actionData?.message && (
        <p className="text-green-600 mt-2 max-w-[300px]">
          {actionData.message}
        </p>
      )}
      {actionData?.error && (
        <p className="text-red-600 mt-2 max-w-[300px]">{actionData.error}</p>
      )}
    </div>
  );
};
