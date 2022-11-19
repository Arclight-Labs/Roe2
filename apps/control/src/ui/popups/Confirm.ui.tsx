import {
  Box,
  Button,
  ButtonProps,
  Group,
  Popover,
  PopoverDropdownProps,
  PopoverProps,
  PopoverTargetProps,
  Stack,
  Text,
} from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { FC } from "react"

interface ConfirmProps extends Omit<PopoverProps, "target" | "opened"> {
  onConfirm: VoidFunction
  message?: string
  ButtonProps?: ButtonProps
  targetProps?: PopoverTargetProps
  dropdownProps?: PopoverDropdownProps
}
const Confirm: FC<ConfirmProps> = ({
  children,
  onConfirm,
  message,
  ButtonProps,
  targetProps,
  dropdownProps,
  ...props
}) => {
  const [opened, toggle] = useToggle([false, true])
  const close = () => toggle(false)
  const clickToggle = () => toggle()

  const confirm = async () => {
    close()
    onConfirm()
  }
  return (
    <Popover
      opened={opened}
      onClose={close}
      position="top"
      withArrow
      transition="pop"
      {...props}
    >
      <Popover.Target {...targetProps}>
        <Box onClick={clickToggle}>{children}</Box>
      </Popover.Target>
      <Popover.Dropdown title="Hey wait!" {...dropdownProps}>
        <Stack sx={{ maxWidth: 300 }}>
          <Text size="sm">{message || "Are you sure?"}</Text>
          <Group position="apart">
            <Button size="xs" {...ButtonProps} onClick={confirm}>
              Confirm
            </Button>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export default Confirm
