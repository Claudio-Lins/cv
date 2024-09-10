import React from "react"

interface CustomIconProps {
  width?: number
  height?: number
  fill?: "bold" | "duotone" | "fill" | "light" | "regular" | "thin"
  cor?: string
  className?: string
}

export function LinkedInIcon({
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
            d="M27 4H5C4.44772 4 4 4.44772 4 5V27C4 27.5523 4.44772 28 5 28H27C27.5523 28 28 27.5523 28 27V5C28 4.44772 27.5523 4 27 4Z"
            stroke={cor}
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.5 15V22"
            stroke={cor}
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.5 15V22"
            stroke={cor}
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.5 18.5C15.5 17.5717 15.8687 16.6815 16.5251 16.0251C17.1815 15.3687 18.0717 15 19 15C19.9283 15 20.8185 15.3687 21.4749 16.0251C22.1313 16.6815 22.5 17.5717 22.5 18.5V22"
            stroke={cor}
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.5 12C11.6046 12 12.5 11.1046 12.5 10C12.5 8.89543 11.6046 8 10.5 8C9.39543 8 8.5 8.89543 8.5 10C8.5 11.1046 9.39543 12 10.5 12Z"
            fill={cor}
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
            d="M27 4H5C4.44772 4 4 4.44772 4 5V27C4 27.5523 4.44772 28 5 28H27C27.5523 28 28 27.5523 28 27V5C28 4.44772 27.5523 4 27 4Z"
            fill={cor}
          />
          <path
            d="M27 4H5C4.44772 4 4 4.44772 4 5V27C4 27.5523 4.44772 28 5 28H27C27.5523 28 28 27.5523 28 27V5C28 4.44772 27.5523 4 27 4Z"
            stroke={cor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 14V22"
            stroke={cor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 14V22"
            stroke={cor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 17.5C15 16.5717 15.3687 15.6815 16.0251 15.0251C16.6815 14.3687 17.5717 14 18.5 14C19.4283 14 20.3185 14.3687 20.9749 15.0251C21.6313 15.6815 22 16.5717 22 17.5V22"
            stroke={cor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 12C11.8284 12 12.5 11.3284 12.5 10.5C12.5 9.67157 11.8284 9 11 9C10.1716 9 9.5 9.67157 9.5 10.5C9.5 11.3284 10.1716 12 11 12Z"
            fill={cor}
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
            d="M27 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V27C3 27.5304 3.21071 28.0391 3.58579 28.4142C3.96086 28.7893 4.46957 29 5 29H27C27.5304 29 28.0391 28.7893 28.4142 28.4142C28.7893 28.0391 29 27.5304 29 27V5C29 4.46957 28.7893 3.96086 28.4142 3.58579C28.0391 3.21071 27.5304 3 27 3ZM12 22C12 22.2652 11.8946 22.5196 11.7071 22.7071C11.5196 22.8946 11.2652 23 11 23C10.7348 23 10.4804 22.8946 10.2929 22.7071C10.1054 22.5196 10 22.2652 10 22V14C10 13.7348 10.1054 13.4804 10.2929 13.2929C10.4804 13.1054 10.7348 13 11 13C11.2652 13 11.5196 13.1054 11.7071 13.2929C11.8946 13.4804 12 13.7348 12 14V22ZM11 12C10.7033 12 10.4133 11.912 10.1666 11.7472C9.91997 11.5824 9.72771 11.3481 9.61418 11.074C9.50065 10.7999 9.47094 10.4983 9.52882 10.2074C9.5867 9.91639 9.72956 9.64912 9.93934 9.43934C10.1491 9.22956 10.4164 9.0867 10.7074 9.02882C10.9983 8.97094 11.2999 9.00065 11.574 9.11418C11.8481 9.22771 12.0824 9.41997 12.2472 9.66665C12.412 9.91332 12.5 10.2033 12.5 10.5C12.5 10.8978 12.342 11.2794 12.0607 11.5607C11.7794 11.842 11.3978 12 11 12ZM23 22C23 22.2652 22.8946 22.5196 22.7071 22.7071C22.5196 22.8946 22.2652 23 22 23C21.7348 23 21.4804 22.8946 21.2929 22.7071C21.1054 22.5196 21 22.2652 21 22V17.5C21 16.837 20.7366 16.2011 20.2678 15.7322C19.7989 15.2634 19.163 15 18.5 15C17.837 15 17.2011 15.2634 16.7322 15.7322C16.2634 16.2011 16 16.837 16 17.5V22C16 22.2652 15.8946 22.5196 15.7071 22.7071C15.5196 22.8946 15.2652 23 15 23C14.7348 23 14.4804 22.8946 14.2929 22.7071C14.1054 22.5196 14 22.2652 14 22V14C14.0012 13.7551 14.0923 13.5191 14.256 13.3369C14.4197 13.1546 14.6446 13.0388 14.888 13.0114C15.1314 12.9839 15.3764 13.0468 15.5765 13.188C15.7767 13.3292 15.918 13.539 15.9738 13.7775C16.6502 13.3186 17.4389 13.0526 18.2552 13.0081C19.0714 12.9637 19.8844 13.1424 20.6067 13.5251C21.329 13.9078 21.9335 14.48 22.3551 15.1803C22.7768 15.8806 22.9997 16.6825 23 17.5V22Z"
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
            d="M27 4H5C4.44772 4 4 4.44772 4 5V27C4 27.5523 4.44772 28 5 28H27C27.5523 28 28 27.5523 28 27V5C28 4.44772 27.5523 4 27 4Z"
            stroke={cor}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 14V22"
            stroke={cor}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 14V22"
            stroke={cor}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 17.5C15 16.5717 15.3687 15.6815 16.0251 15.0251C16.6815 14.3687 17.5717 14 18.5 14C19.4283 14 20.3185 14.3687 20.9749 15.0251C21.6313 15.6815 22 16.5717 22 17.5V22"
            stroke={cor}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 11.75C11.6904 11.75 12.25 11.1904 12.25 10.5C12.25 9.80964 11.6904 9.25 11 9.25C10.3096 9.25 9.75 9.80964 9.75 10.5C9.75 11.1904 10.3096 11.75 11 11.75Z"
            fill={cor}
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
            d="M27 4H5C4.44772 4 4 4.44772 4 5V27C4 27.5523 4.44772 28 5 28H27C27.5523 28 28 27.5523 28 27V5C28 4.44772 27.5523 4 27 4Z"
            stroke={cor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 14V22"
            stroke={cor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 14V22"
            stroke={cor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 17.5C15 16.5717 15.3687 15.6815 16.0251 15.0251C16.6815 14.3687 17.5717 14 18.5 14C19.4283 14 20.3185 14.3687 20.9749 15.0251C21.6313 15.6815 22 16.5717 22 17.5V22"
            stroke={cor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 12C11.8284 12 12.5 11.3284 12.5 10.5C12.5 9.67157 11.8284 9 11 9C10.1716 9 9.5 9.67157 9.5 10.5C9.5 11.3284 10.1716 12 11 12Z"
            fill={cor}
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
            d="M27 4H5C4.44772 4 4 4.44772 4 5V27C4 27.5523 4.44772 28 5 28H27C27.5523 28 28 27.5523 28 27V5C28 4.44772 27.5523 4 27 4Z"
            stroke={cor}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 14V22"
            stroke={cor}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 14V22"
            stroke={cor}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 17.5C15 16.5717 15.3687 15.6815 16.0251 15.0251C16.6815 14.3687 17.5717 14 18.5 14C19.4283 14 20.3185 14.3687 20.9749 15.0251C21.6313 15.6815 22 16.5717 22 17.5V22"
            stroke={cor}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 11.5C11.5523 11.5 12 11.0523 12 10.5C12 9.94772 11.5523 9.5 11 9.5C10.4477 9.5 10 9.94772 10 10.5C10 11.0523 10.4477 11.5 11 11.5Z"
            fill={cor}
          />
        </svg>
      )
    }

    return null
  }

  return <div className={className}>{renderIcon()}</div>
}
