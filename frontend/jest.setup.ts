import "@testing-library/jest-dom";
import fetch, { Headers, Request, Response } from "cross-fetch";

// polyfill fetch for Node.js environment
global.fetch = fetch as any;
global.Headers = Headers as any;
global.Request = Request as any;
global.Response = Response as any;
