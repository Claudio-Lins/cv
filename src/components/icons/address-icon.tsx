import React from "react"

interface CustomIconProps {
  width?: number
  height?: number
  fill?: "bold" | "duotone" | "fill" | "light" | "regular" | "thin"
  className?: string
  cor?: string
}

export function AddressIcon({
  width = 24,
  height = 24,
  fill = "regular",
  cor = "#343330",
  className,
}: CustomIconProps) {
  function renderIcon() {
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
            d="M26 4H8C7.73478 4 7.48043 4.10536 7.29289 4.29289C7.10536 4.48043 7 4.73478 7 5V27C7 27.2652 7.10536 27.5196 7.29289 27.7071C7.48043 27.8946 7.73478 28 8 28H26C26.2652 28 26.5196 27.8946 26.7071 27.7071C26.8946 27.5196 27 27.2652 27 27V5C27 4.73478 26.8946 4.48043 26.7071 4.29289C26.5196 4.10536 26.2652 4 26 4ZM17 18C16.2089 18 15.4355 17.7654 14.7777 17.3259C14.1199 16.8864 13.6072 16.2616 13.3045 15.5307C13.0017 14.7998 12.9225 13.9956 13.0769 13.2196C13.2312 12.4437 13.6122 11.731 14.1716 11.1716C14.731 10.6122 15.4437 10.2312 16.2196 10.0769C16.9956 9.92252 17.7998 10.0017 18.5307 10.3045C19.2616 10.6072 19.8864 11.1199 20.3259 11.7777C20.7654 12.4355 21 13.2089 21 14C21 15.0609 20.5786 16.0783 19.8284 16.8284C19.0783 17.5786 18.0609 18 17 18Z"
            fill={cor}
          />
          <path
            d="M17 18C19.2091 18 21 16.2091 21 14C21 11.7909 19.2091 10 17 10C14.7909 10 13 11.7909 13 14C13 16.2091 14.7909 18 17 18Z"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 9H7"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 16H7"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 23H7"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 21C11.6986 20.0685 12.6045 19.3125 13.6459 18.7918C14.6873 18.2711 15.8357 18 17 18C18.1643 18 19.3127 18.2711 20.3541 18.7918C21.3955 19.3125 22.3014 20.0685 23 21"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 27V5C27 4.44772 26.5523 4 26 4L8 4C7.44772 4 7 4.44772 7 5V27C7 27.5523 7.44772 28 8 28H26C26.5523 28 27 27.5523 27 27Z"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }

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
            d="M17 18C19.2091 18 21 16.2091 21 14C21 11.7909 19.2091 10 17 10C14.7909 10 13 11.7909 13 14C13 16.2091 14.7909 18 17 18Z"
            stroke={cor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 9H7"
            stroke={cor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 16H7"
            stroke={cor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 23H7"
            stroke={cor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 27V5C27 4.44772 26.5523 4 26 4L8 4C7.44772 4 7 4.44772 7 5V27C7 27.5523 7.44772 28 8 28H26C26.5523 28 27 27.5523 27 27Z"
            stroke={cor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.5 20.401C12.2021 19.6437 13.053 19.0396 13.9994 18.6264C14.9458 18.2133 15.9673 18 17 18C18.0327 18 19.0542 18.2133 20.0006 18.6264C20.947 19.0396 21.7979 19.6437 22.5 20.401"
            stroke={cor}
            strokeWidth="3"
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
            d="M20 14C20 14.5933 19.8241 15.1734 19.4944 15.6667C19.1648 16.1601 18.6962 16.5446 18.1481 16.7716C17.5999 16.9987 16.9967 17.0581 16.4147 16.9424C15.8328 16.8266 15.2982 16.5409 14.8787 16.1213C14.4591 15.7018 14.1734 15.1672 14.0576 14.5853C13.9419 14.0033 14.0013 13.4001 14.2284 12.8519C14.4554 12.3038 14.8399 11.8352 15.3333 11.5056C15.8266 11.1759 16.4067 11 17 11C17.7956 11 18.5587 11.3161 19.1213 11.8787C19.6839 12.4413 20 13.2044 20 14ZM28 5V27C28 27.5304 27.7893 28.0391 27.4142 28.4142C27.0391 28.7893 26.5304 29 26 29H8C7.46957 29 6.96086 28.7893 6.58579 28.4142C6.21071 28.0391 6 27.5304 6 27V24H4C3.73478 24 3.48043 23.8946 3.29289 23.7071C3.10536 23.5196 3 23.2652 3 23C3 22.7348 3.10536 22.4804 3.29289 22.2929C3.48043 22.1054 3.73478 22 4 22H6V17H4C3.73478 17 3.48043 16.8946 3.29289 16.7071C3.10536 16.5196 3 16.2652 3 16C3 15.7348 3.10536 15.4804 3.29289 15.2929C3.48043 15.1054 3.73478 15 4 15H6V10H4C3.73478 10 3.48043 9.89464 3.29289 9.70711C3.10536 9.51957 3 9.26522 3 9C3 8.73478 3.10536 8.48043 3.29289 8.29289C3.48043 8.10536 3.73478 8 4 8H6V5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3H26C26.5304 3 27.0391 3.21071 27.4142 3.58579C27.7893 3.96086 28 4.46957 28 5ZM23.8 20.4C22.9145 19.2128 21.7337 18.2781 20.375 17.6887C21.1196 17.0089 21.6413 16.1199 21.8716 15.1382C22.1019 14.1566 22.03 13.1283 21.6654 12.1883C21.3009 11.2482 20.6606 10.4404 19.8287 9.87072C18.9967 9.30106 18.012 8.99623 17.0037 8.99623C15.9955 8.99623 15.0108 9.30106 14.1788 9.87072C13.3469 10.4404 12.7066 11.2482 12.3421 12.1883C11.9775 13.1283 11.9056 14.1566 12.1359 15.1382C12.3662 16.1199 12.8879 17.0089 13.6325 17.6887C12.271 18.277 11.0876 19.2118 10.2 20.4C10.1212 20.5051 10.0639 20.6246 10.0313 20.7518C9.99869 20.879 9.99148 21.0114 10.0101 21.1414C10.0286 21.2714 10.0726 21.3965 10.1395 21.5095C10.2064 21.6225 10.2949 21.7212 10.4 21.8C10.5051 21.8788 10.6246 21.9361 10.7518 21.9687C10.879 22.0013 11.0114 22.0085 11.1414 21.99C11.2714 21.9714 11.3965 21.9274 11.5095 21.8605C11.6225 21.7936 11.7212 21.7051 11.8 21.6C12.4055 20.7927 13.1906 20.1375 14.0931 19.6862C14.9957 19.2349 15.9909 19 17 19C18.0091 19 19.0043 19.2349 19.9069 19.6862C20.8095 20.1375 21.5945 20.7927 22.2 21.6C22.3591 21.8122 22.596 21.9524 22.8586 21.99C23.1211 22.0275 23.3878 21.9591 23.6 21.8C23.8122 21.6409 23.9524 21.404 23.99 21.1414C24.0275 20.8789 23.9591 20.6122 23.8 20.4Z"
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
            d="M17 18C19.2091 18 21 16.2091 21 14C21 11.7909 19.2091 10 17 10C14.7909 10 13 11.7909 13 14C13 16.2091 14.7909 18 17 18Z"
            stroke={cor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 9H7"
            stroke={cor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 16H7"
            stroke={cor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 23H7"
            stroke={cor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 21C11.6986 20.0685 12.6045 19.3125 13.6459 18.7918C14.6873 18.2711 15.8357 18 17 18C18.1643 18 19.3127 18.2711 20.3541 18.7918C21.3955 19.3125 22.3014 20.0685 23 21"
            stroke={cor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 27V5C27 4.44772 26.5523 4 26 4L8 4C7.44772 4 7 4.44772 7 5V27C7 27.5523 7.44772 28 8 28H26C26.5523 28 27 27.5523 27 27Z"
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
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 18C19.2091 18 21 16.2091 21 14C21 11.7909 19.2091 10 17 10C14.7909 10 13 11.7909 13 14C13 16.2091 14.7909 18 17 18Z"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 9H7"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 16H7"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 23H7"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 21C11.6986 20.0685 12.6045 19.3125 13.6459 18.7918C14.6873 18.2711 15.8357 18 17 18C18.1643 18 19.3127 18.2711 20.3541 18.7918C21.3955 19.3125 22.3014 20.0685 23 21"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 27V5C27 4.44772 26.5523 4 26 4L8 4C7.44772 4 7 4.44772 7 5V27C7 27.5523 7.44772 28 8 28H26C26.5523 28 27 27.5523 27 27Z"
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
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 18C19.2091 18 21 16.2091 21 14C21 11.7909 19.2091 10 17 10C14.7909 10 13 11.7909 13 14C13 16.2091 14.7909 18 17 18Z"
            stroke={cor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 9H7"
            stroke={cor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 16H7"
            stroke={cor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 23H7"
            stroke={cor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 21C11.6986 20.0685 12.6045 19.3125 13.6459 18.7918C14.6873 18.2711 15.8357 18 17 18C18.1643 18 19.3127 18.2711 20.3541 18.7918C21.3955 19.3125 22.3014 20.0685 23 21"
            stroke={cor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 27V5C27 4.44772 26.5523 4 26 4L8 4C7.44772 4 7 4.44772 7 5V27C7 27.5523 7.44772 28 8 28H26C26.5523 28 27 27.5523 27 27Z"
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
