import React from "react"

interface CustomIconProps {
  width?: number
  height?: number
  fill?: "bold" | "duotone" | "fill" | "light" | "regular" | "thin"
  cor?: string
  className?: string
}

export function TrashIcon({
  width = 24,
  height = 24,
  fill = "regular",
  cor = "#343330",
  className,
}: CustomIconProps) {
  function renderIcon() {
    if (fill === "bold") {
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27 7.5H5"
            stroke={cor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 13V21"
            stroke={cor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 13V21"
            stroke={cor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 7.5V26C25 26.2652 24.8946 26.5196 24.7071 26.7071C24.5196 26.8946 24.2652 27 24 27H8C7.73478 27 7.48043 26.8946 7.29289 26.7071C7.10536 26.5196 7 26.2652 7 26V7.5"
            stroke={cor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 7.5V4.5C21 3.96957 20.7893 3.46086 20.4142 3.08579C20.0391 2.71071 19.5304 2.5 19 2.5H13C12.4696 2.5 11.9609 2.71071 11.5858 3.08579C11.2107 3.46086 11 3.96957 11 4.5V7.5"
            stroke={cor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
    if (fill === "duotone") {
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.2"
            d="M13.7963 20.3663C13.7963 20.3663 15 23 19 23C23 23 27 19.5225 27 14C27.0002 11.459 26.033 9.01314 24.2949 7.15946C22.5569 5.30578 20.1783 4.18328 17.6425 4.02002L16 11L13.7963 20.3663Z"
            fill={cor}
          />
          <path
            d="M16 11L12 28"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.3375 19C7.57134 17.6716 7.12096 16.1848 7.02119 14.6545C6.92142 13.1242 7.17493 11.5915 7.76212 10.1749C8.34932 8.75821 9.25446 7.49558 10.4076 6.48462C11.5607 5.47365 12.9308 4.74143 14.4121 4.34457C15.8934 3.94771 17.4461 3.89684 18.9502 4.19591C20.4542 4.49497 21.8694 5.13595 23.0862 6.06928C24.303 7.00261 25.2888 8.20329 25.9675 9.57847C26.6461 10.9536 26.9994 12.4665 27 14C27 19.5225 23 23 19 23C15 23 13.7963 20.3663 13.7963 20.3663"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
    if (fill === "fill") {
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 16.0876C29.9525 23.1489 24.1925 28.9289 17.1325 28.9989C16.0402 29.0104 14.9509 28.8844 13.89 28.6239C13.8262 28.6079 13.7662 28.5796 13.7133 28.5404C13.6605 28.5012 13.6159 28.452 13.5821 28.3956C13.5483 28.3392 13.526 28.2766 13.5164 28.2115C13.5068 28.1465 13.5102 28.0801 13.5263 28.0164L14.6063 23.6976C15.6597 24.2255 16.8217 24.5003 18 24.5001C22.625 24.5001 26.3375 20.3189 25.9763 15.3301C25.8783 14.0353 25.5013 12.777 24.8711 11.6416C24.2409 10.5062 23.3725 9.52063 22.3255 8.75253C21.2785 7.98444 20.0776 7.45201 18.8054 7.19179C17.5332 6.93158 16.2198 6.94975 14.9553 7.24505C13.6907 7.54035 12.5051 8.10579 11.4797 8.90255C10.4543 9.69932 9.61353 10.7085 9.015 11.8609C8.41646 13.0133 8.07439 14.2815 8.01225 15.5786C7.95012 16.8757 8.1694 18.1708 8.65503 19.3751C8.70548 19.5008 8.78092 19.6148 8.87678 19.7105C8.97263 19.8061 9.0869 19.8812 9.21266 19.9314C9.33842 19.9815 9.47305 20.0056 9.6084 20.0021C9.74374 19.9987 9.87698 19.9678 10 19.9114C10.2347 19.7976 10.4171 19.5986 10.5101 19.3549C10.603 19.1112 10.5994 18.8412 10.5 18.6001C10.1263 17.6628 9.95958 16.6558 10.0114 15.6481C10.0631 14.6404 10.3321 13.6558 10.8 12.7618C11.2678 11.8677 11.9234 11.0854 12.7218 10.4684C13.5203 9.85142 14.4426 9.41433 15.4258 9.1871C16.4089 8.95987 17.4295 8.94786 18.4177 9.15192C19.4059 9.35597 20.3383 9.77126 21.151 10.3693C21.9637 10.9674 22.6375 11.7341 23.1263 12.6168C23.615 13.4996 23.9071 14.4776 23.9825 15.4839C24.25 19.3001 21.4663 22.5001 18 22.5001C16.9806 22.4996 15.9806 22.2213 15.1075 21.6951L16.97 14.2426C17.0293 13.9871 16.9858 13.7186 16.8489 13.4949C16.7121 13.2712 16.4928 13.1102 16.2384 13.0466C15.984 12.983 15.7148 13.0219 15.4887 13.1549C15.2627 13.2879 15.098 13.5043 15.03 13.7576L11.6725 27.1889C11.6543 27.262 11.6198 27.3301 11.5715 27.388C11.5233 27.4459 11.4626 27.4921 11.3939 27.5233C11.3253 27.5544 11.2505 27.5696 11.1751 27.5678C11.0998 27.5659 11.0258 27.5471 10.9588 27.5126C8.83807 26.3998 7.06598 24.7228 5.83804 22.6666C4.6101 20.6104 3.97404 18.2549 4.00003 15.8601C4.07503 8.81511 9.83378 3.06512 16.875 3.00012C18.6001 2.98349 20.3112 3.31038 21.9087 3.96173C23.5061 4.61308 24.958 5.57587 26.1796 6.79398C27.4012 8.0121 28.3681 9.46117 29.024 11.0568C29.6799 12.6523 30.0117 14.3625 30 16.0876Z"
            fill={cor}
          />
        </svg>
      )
    }
    if (fill === "light") {
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27 7H5"
            stroke={cor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 13V21"
            stroke={cor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 13V21"
            stroke={cor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 7V26C25 26.2652 24.8946 26.5196 24.7071 26.7071C24.5196 26.8946 24.2652 27 24 27H8C7.73478 27 7.48043 26.8946 7.29289 26.7071C7.10536 26.5196 7 26.2652 7 26V7"
            stroke={cor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 7V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H13C12.4696 3 11.9609 3.21071 11.5858 3.58579C11.2107 3.96086 11 4.46957 11 5V7"
            stroke={cor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
    if (fill === "regular") {
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27 7H5"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 13V21"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 13V21"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 7V26C25 26.2652 24.8946 26.5196 24.7071 26.7071C24.5196 26.8946 24.2652 27 24 27H8C7.73478 27 7.48043 26.8946 7.29289 26.7071C7.10536 26.5196 7 26.2652 7 26V7"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 7V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H13C12.4696 3 11.9609 3.21071 11.5858 3.58579C11.2107 3.96086 11 4.46957 11 5V7"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
    if (fill === "thin") {
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27 7H5"
            stroke={cor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 13V21"
            stroke={cor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 13V21"
            stroke={cor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 7V26C25 26.2652 24.8946 26.5196 24.7071 26.7071C24.5196 26.8946 24.2652 27 24 27H8C7.73478 27 7.48043 26.8946 7.29289 26.7071C7.10536 26.5196 7 26.2652 7 26V7"
            stroke={cor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 7V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H13C12.4696 3 11.9609 3.21071 11.5858 3.58579C11.2107 3.96086 11 4.46957 11 5V7"
            stroke={cor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }

    return null
  }

  return <div className={className}>{renderIcon()}</div>
}
