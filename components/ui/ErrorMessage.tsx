type ErrorMessageProps = {
  title: string;
};

const ErrorMessage = ({ title }: ErrorMessageProps) => {
  return <p className="text-error py-2">{title}</p>;
};

export default ErrorMessage;
