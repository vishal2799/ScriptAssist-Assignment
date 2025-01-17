import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const toggleColorScheme = () => {
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
      };
  return (
    <ActionIcon
      variant="outline"
      color={colorScheme === 'dark' ? 'blue' : 'yellow'}
      onClick={toggleColorScheme}
      title="Toggle color scheme"
    >
      {colorScheme === 'dark' ? (
        <FaMoon style={{ width: 18, height: 18 }} />
      ) : (
        <FaSun style={{ width: 18, height: 18 }} />
      )}
    </ActionIcon>
  );
}