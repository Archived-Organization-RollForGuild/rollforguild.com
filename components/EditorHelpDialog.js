// Module Imports
import Dialog from './Dialog'
import Link from './Link'





const syntaxGuideLink = (
  <Link
    category="Editor Help"
    label="Search"
    href="https://daringfireball.net/projects/markdown/syntax">
    Markdown syntax guide from Daring Fireball
  </Link>
)
const example = `*Italicized*

**Bold**

[Link](https://example.com/image.png)

![Alt Text](https://example.com/image.png "title")

* This
* Is
* A
* List

1. This
1. Is
1. An
1. Ordered
1. List`





const EditorHelpDialog = props => (
  <Dialog
    title="Formatting with Markdown"
    {...props}>
    <p>Markdown is a handy, simple formatting syntax. For more details, check out the {syntaxGuideLink}.</p>

    <pre>{example}</pre>
  </Dialog>
)





export default EditorHelpDialog
