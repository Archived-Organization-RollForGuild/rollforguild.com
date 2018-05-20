// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





// Component imports
import Button from './Button'





const MarkdownHelpButton = ({ category, onClick }) => (
  <Button
    category={category}
    className="inline link"
    label="Markdown Help"
    onClick={onClick}>
    <FontAwesomeIcon fixedWidth icon="pencil-alt" /> Styling with Markdown is supported
  </Button>
)





export default MarkdownHelpButton
