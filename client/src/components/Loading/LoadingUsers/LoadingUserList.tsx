import LoadingUsersItem from "./LoadingUsersItem";

interface LoadingUsersProps {
  count: number;
}

const LoadingUsersList = ({ count }: LoadingUsersProps) => {
  return (
    <div className="users">
      {Array.from({ length: count }).map((_, index) => (
        <LoadingUsersItem key={index} />
      ))}
    </div>
  )
}

export default LoadingUsersList;
