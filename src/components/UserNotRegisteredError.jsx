export default function UserNotRegisteredError() {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">User not registered</h1>
        <p className="text-muted-foreground">
          Your account is not registered for this app.
        </p>
      </div>
    </div>
  );
}
