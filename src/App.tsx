import "./styles/theme.css"
import "./styles/global.css"
import { Heading } from "./components/Heading"
import { TimerIcon } from "lucide-react";

export function App() {
  return (
    <div>
      <Heading>
        Hello
        <button>
            <TimerIcon />
        </button>
      </Heading>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam expedita
        vitae est obcaecati minus neque eligendi magni vel quibusdam aliquid
        dignissimos architecto minima animi similique, ratione aperiam ducimus.
        Cumque ad vitae, ea necessitatibus laboriosam distinctio, facilis
        labore, nobis repellendus sed quis officia? Dignissimos repudiandae unde
        sed sint dicta laudantium at?
      </p>
    </div>
  );
}
