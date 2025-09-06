import type { Message } from "~/core/messages";


interface DeepResearchProps {
    messages: string[];
    from: string
}
const DeepResearch = ({ messages, from }:DeepResearchProps) => {

  return (
    <div>
        <h1>Deep Research Component{from}</h1>
        {
            messages.map((msg, index) => (
                <div key={index}>
                    <p>{msg}</p>
                </div>
            ))
        }
  </div>
  );
};

export default DeepResearch;