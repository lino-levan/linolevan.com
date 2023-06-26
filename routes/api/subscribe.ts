import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req) {
    const email = new URL(req.url).searchParams.get("email");

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required." }), {
        status: 400,
      });
    }

    try {
      const FORM_ID = Deno.env.get("CONVERTKIT_FORM_ID");
      const API_KEY = Deno.env.get("CONVERTKIT_API_KEY");
      const API_URL = Deno.env.get("CONVERTKIT_API_URL");

      //what do we want to send to CK?
      const data = { email, api_key: API_KEY };

      // ship it :)
      const response = await fetch(`${API_URL}forms/${FORM_ID}/subscribe`, {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      // return any error from CK
      if (response.status >= 400) {
        return new Response(
          JSON.stringify({
            error: "There was an error subscribing to the list.",
          }),
          {
            status: 400,
          },
        );
      }

      // happy days
      return new Response(JSON.stringify({ error: "" }), {
        status: 201,
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message || error.toString() }),
        {
          status: 500,
        },
      );
    }
  },
};
