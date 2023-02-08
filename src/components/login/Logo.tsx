import { chakra, HTMLChakraProps } from '@chakra-ui/react'

export const Logo = (props: HTMLChakraProps<'svg'>) => (
  <chakra.svg
    color="accent"
    height="49"
    width="auto"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M15.822 0h21.52L21.522 22.973H0L15.822 0Z" fill="#007AFF" />
    <path
      d="M16.765 25.102 10.636 34h22.542L49 11.027H32.363l-9.694 14.075h-5.904Z"
      fill="#312ECB"/>
  </chakra.svg>
)

// export const Logo = (props: HTMLChakraProps<"svg">) => (
//   <chakra.svg
//     color="accent"
//     width={49}
//     height={34}
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     {...props}
//   >
//     <path d="M15.822 0h21.52L21.522 22.973H0L15.822 0Z" fill="#007AFF" />
//     <path
//       d="M16.765 25.102 10.636 34h22.542L49 11.027H32.363l-9.694 14.075h-5.904Z"
//       fill="#312ECB"
//     />
//   </chakra.svg>
// );
