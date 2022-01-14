import { storiesOf } from "@storybook/react"

import Timer from "../components/Timer"

storiesOf("components", module)
  .add("Timer", () => <Timer seconds={45}/>)