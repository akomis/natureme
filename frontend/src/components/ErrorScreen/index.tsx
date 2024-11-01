import HomeButton from "../HomeButton";
import Screen from "../Screen";

type Props = {
  message: string;
};

export default function ErrorScreen({ message }: Props) {
  return (
    <Screen>
      <p className="text-lg text-center">{message}</p>
      <HomeButton />
    </Screen>
  );
}
