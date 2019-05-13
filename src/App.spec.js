require("jest-dom/extend-expect");
const { toBeInTheDocument, toHaveClass } = require("jest-dom");
expect.extend({ toBeInTheDocument });

const App = require("./App.svelte");
const { render, fireEvent, waitForElement } = require("svelte-testing-library");

describe("App", () => {
  test("close button should exist and work with an event listener.", async () => {
    const { getByRole } = render(App, { props: { primary: true } });

    const button = await waitForElement(() => getByRole("button"));

    button.addEventListener("close", e => {
      expect(e.detail).toBe("alert-box was closed.");
    });

    fireEvent.click(getByRole("button"));

    expect(button).toBeInTheDocument();
  });
});
