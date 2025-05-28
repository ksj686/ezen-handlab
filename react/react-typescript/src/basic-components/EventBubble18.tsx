type EventSend = {
  onnClick: () => void;
  children: React.ReactNode;
};
function Button({ onnClick, children }: EventSend) {
  return (
      <div>
      <button onClick={(e: React.ChangeEvent<HTMLInputElement>)}>{children}</button>
    </div>
  );
}
export default function EventBubble18() {
  return (
    <div className="bubble" onClick={}>
      <Button onSend={() => alert("play")}>play</Button>
      <Button onSend={() => alert("stop")}>stop</Button>
    </div>
  );
}
