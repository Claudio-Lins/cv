import React from "react"

interface CustomIconProps {
  width?: number
  height?: number
  fill?: "bold" | "duotone" | "fill" | "light" | "regular" | "thin"
  cor?: string
  className?: string
}

export function HouseIcon({
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
            d="M16.7075 4.29231C16.6146 4.19933 16.5043 4.12557 16.3829 4.07525C16.2615 4.02493 16.1314 3.99902 16 3.99902C15.8686 3.99902 15.7385 4.02493 15.6171 4.07525C15.4957 4.12557 15.3854 4.19933 15.2925 4.29231L5 14.5861V26.9998H13V18.9998H19V26.9998H27V14.5861L16.7075 4.29231Z"
            fill={cor}
          />
          <path
            d="M2 27H30"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 27V19H13V27"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 14.5864V27.0002"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 27.0002V14.5864"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 16.5861L15.2925 4.29231C15.3854 4.19933 15.4957 4.12557 15.6171 4.07525C15.7385 4.02493 15.8686 3.99902 16 3.99902C16.1314 3.99902 16.2615 4.02493 16.3829 4.07525C16.5043 4.12557 16.6146 4.19933 16.7075 4.29231L29 16.5861"
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
            d="M2 27H30"
            stroke={cor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 27V19H13V27"
            stroke={cor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 14.5864V27.0002"
            stroke={cor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 27.0002V14.5864"
            stroke={cor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 16.5861L15.2925 4.29231C15.3854 4.19933 15.4957 4.12557 15.6171 4.07525C15.7385 4.02493 15.8686 3.99902 16 3.99902C16.1314 3.99902 16.2615 4.02493 16.3829 4.07525C16.5043 4.12557 16.6146 4.19933 16.7075 4.29231L29 16.5861"
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
            d="M30 25.9998H28V16.9998L28.2925 17.2923C28.4805 17.48 28.7353 17.5853 29.0009 17.585C29.2665 17.5848 29.5211 17.4791 29.7087 17.2911C29.8964 17.1031 30.0017 16.8483 30.0014 16.5827C30.0012 16.3171 29.8955 16.0625 29.7075 15.8748L17.4137 3.58483C17.0387 3.21005 16.5302 2.99951 16 2.99951C15.4698 2.99951 14.9613 3.21005 14.5863 3.58483L2.2925 15.8748C2.10503 16.0625 1.99977 16.3169 1.99989 16.5822C2 16.8474 2.10548 17.1017 2.29312 17.2892C2.48077 17.4767 2.7352 17.5819 3.00044 17.5818C3.26569 17.5817 3.52003 17.4762 3.7075 17.2886L4 16.9998V25.9998H2C1.73478 25.9998 1.48043 26.1052 1.29289 26.2927C1.10536 26.4803 1 26.7346 1 26.9998C1 27.2651 1.10536 27.5194 1.29289 27.7069C1.48043 27.8945 1.73478 27.9998 2 27.9998H30C30.2652 27.9998 30.5196 27.8945 30.7071 27.7069C30.8946 27.5194 31 27.2651 31 26.9998C31 26.7346 30.8946 26.4803 30.7071 26.2927C30.5196 26.1052 30.2652 25.9998 30 25.9998ZM19 25.9998H13V19.9998C13 19.8672 13.0527 19.74 13.1464 19.6463C13.2402 19.5525 13.3674 19.4998 13.5 19.4998H18.5C18.6326 19.4998 18.7598 19.5525 18.8536 19.6463C18.9473 19.74 19 19.8672 19 19.9998V25.9998Z"
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
            d="M2 27H30"
            stroke={cor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 27V19H13V27"
            stroke={cor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 14.5864V27.0002"
            stroke={cor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 27.0002V14.5864"
            stroke={cor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 16.5861L15.2925 4.29231C15.3854 4.19933 15.4957 4.12557 15.6171 4.07525C15.7385 4.02493 15.8686 3.99902 16 3.99902C16.1314 3.99902 16.2615 4.02493 16.3829 4.07525C16.5043 4.12557 16.6146 4.19933 16.7075 4.29231L29 16.5861"
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
            d="M2 27H30"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 27V19H13V27"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 14.5864V27.0002"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 27.0002V14.5864"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 16.5861L15.2925 4.29231C15.3854 4.19933 15.4957 4.12557 15.6171 4.07525C15.7385 4.02493 15.8686 3.99902 16 3.99902C16.1314 3.99902 16.2615 4.02493 16.3829 4.07525C16.5043 4.12557 16.6146 4.19933 16.7075 4.29231L29 16.5861"
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
            d="M2 27H30"
            stroke={cor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 27V19H13V27"
            stroke={cor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 14.5864V27.0002"
            stroke={cor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 27.0002V14.5864"
            stroke={cor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 16.5861L15.2925 4.29231C15.3854 4.19933 15.4957 4.12557 15.6171 4.07525C15.7385 4.02493 15.8686 3.99902 16 3.99902C16.1314 3.99902 16.2615 4.02493 16.3829 4.07525C16.5043 4.12557 16.6146 4.19933 16.7075 4.29231L29 16.5861"
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
