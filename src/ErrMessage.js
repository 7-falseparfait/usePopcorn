export function ErrMessage({ errMessage }) {
  console.log(errMessage);
  return (
    <p className="error">
      {" "}
      <span>❗❗</span> {errMessage}
    </p>
  );
}
