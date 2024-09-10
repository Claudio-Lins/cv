import React from "react"

interface CustomIconProps {
  width?: number
  height?: number
  fill?: "bold" | "duotone" | "fill" | "light" | "regular" | "thin"
  cor?: string
  className?: string
}

export function PhoneIcon({
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
            d="M20.5488 18.1675C20.6872 18.0753 20.8465 18.0192 21.0122 18.0041C21.1779 17.989 21.3447 18.0156 21.4975 18.0812L27.3925 20.7225C27.5912 20.8074 27.757 20.9543 27.8651 21.1414C27.9733 21.3284 28.018 21.5454 27.9925 21.76C27.7983 23.2113 27.0836 24.5427 25.9813 25.5065C24.8791 26.4704 23.4642 27.0011 22 27C17.4913 27 13.1673 25.2089 9.97919 22.0208C6.79107 18.8327 5 14.5087 5 9.99997C4.99888 8.53573 5.5296 7.12091 6.49345 6.01864C7.45731 4.91637 8.78869 4.20167 10.24 4.00747C10.4545 3.98199 10.6716 4.02666 10.8586 4.13482C11.0456 4.24299 11.1926 4.40881 11.2775 4.60747L13.9188 10.5075C13.9836 10.659 14.0101 10.8242 13.9957 10.9885C13.9813 11.1527 13.9265 11.3108 13.8363 11.4487L11.165 14.625C11.0702 14.768 11.0142 14.9331 11.0024 15.1042C10.9906 15.2753 11.0233 15.4466 11.0975 15.6012C12.1313 17.7175 14.3188 19.8787 16.4413 20.9025C16.5967 20.9763 16.7688 21.0084 16.9404 20.9954C17.112 20.9825 17.2773 20.925 17.42 20.8287L20.5488 18.1675Z"
            fill={cor}
          />
          <path
            d="M20.5488 18.1675C20.6872 18.0753 20.8465 18.0192 21.0122 18.0041C21.1779 17.989 21.3447 18.0156 21.4975 18.0812L27.3925 20.7225C27.5912 20.8074 27.757 20.9543 27.8651 21.1414C27.9733 21.3284 28.018 21.5454 27.9925 21.76C27.7983 23.2113 27.0836 24.5427 25.9813 25.5065C24.8791 26.4704 23.4642 27.0011 22 27C17.4913 27 13.1673 25.2089 9.97919 22.0208C6.79107 18.8327 5 14.5087 5 9.99997C4.99888 8.53573 5.5296 7.12091 6.49345 6.01864C7.45731 4.91637 8.78869 4.20167 10.24 4.00747C10.4545 3.98199 10.6716 4.02666 10.8586 4.13482C11.0456 4.24299 11.1926 4.40881 11.2775 4.60747L13.9188 10.5075C13.9836 10.659 14.0101 10.8242 13.9957 10.9885C13.9813 11.1527 13.9265 11.3108 13.8363 11.4487L11.165 14.625C11.0702 14.768 11.0142 14.9331 11.0024 15.1042C10.9906 15.2753 11.0233 15.4466 11.0975 15.6012C12.1313 17.7175 14.3188 19.8787 16.4413 20.9025C16.5967 20.9763 16.7688 21.0084 16.9404 20.9954C17.112 20.9825 17.2773 20.925 17.42 20.8287L20.5488 18.1675Z"
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
            d="M20.5488 18.1675C20.6872 18.0753 20.8465 18.0192 21.0122 18.0041C21.1779 17.989 21.3447 18.0156 21.4975 18.0812L27.3925 20.7225C27.5912 20.8074 27.757 20.9543 27.8651 21.1414C27.9733 21.3284 28.018 21.5454 27.9925 21.76C27.7983 23.2113 27.0836 24.5427 25.9813 25.5065C24.8791 26.4704 23.4642 27.0011 22 27C17.4913 27 13.1673 25.2089 9.97919 22.0208C6.79107 18.8327 5 14.5087 5 9.99997C4.99888 8.53573 5.5296 7.12091 6.49345 6.01864C7.45731 4.91637 8.78869 4.20167 10.24 4.00747C10.4545 3.98199 10.6716 4.02666 10.8586 4.13482C11.0456 4.24299 11.1926 4.40881 11.2775 4.60747L13.9188 10.5075C13.9836 10.659 14.0101 10.8242 13.9957 10.9885C13.9813 11.1527 13.9265 11.3108 13.8363 11.4487L11.165 14.625C11.0702 14.768 11.0142 14.9331 11.0024 15.1042C10.9906 15.2753 11.0233 15.4466 11.0975 15.6012C12.1313 17.7175 14.3188 19.8787 16.4413 20.9025C16.5967 20.9763 16.7688 21.0084 16.9404 20.9954C17.112 20.9825 17.2773 20.925 17.42 20.8287L20.5488 18.1675Z"
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
            d="M28.985 21.8852C28.7621 23.579 27.9303 25.1338 26.6449 26.2591C25.3595 27.3844 23.7084 28.0033 22 28.0002C12.075 28.0002 4.00001 19.9252 4.00001 10.0002C3.99695 8.29185 4.61587 6.64076 5.74118 5.35535C6.86649 4.06995 8.42122 3.23812 10.115 3.01524C10.5433 2.96294 10.9771 3.05056 11.3515 3.26503C11.7259 3.4795 12.0209 3.80932 12.1925 4.20524L14.8325 10.099V10.114C14.9639 10.4171 15.0181 10.7479 14.9904 11.0771C14.9627 11.4062 14.8539 11.7234 14.6738 12.0002C14.6513 12.034 14.6275 12.0652 14.6025 12.0965L12 15.1815C12.9363 17.084 14.9263 19.0565 16.8538 19.9952L19.8963 17.4065C19.9261 17.3814 19.9574 17.358 19.99 17.3365C20.2666 17.152 20.5849 17.0394 20.916 17.0088C21.2471 16.9783 21.5806 17.0307 21.8863 17.1615L21.9025 17.169L27.7913 19.8077C28.1879 19.9787 28.5185 20.2735 28.7337 20.6479C28.9489 21.0224 29.037 21.4565 28.985 21.8852Z"
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
            d="M20.5488 18.1675C20.6872 18.0753 20.8465 18.0192 21.0122 18.0041C21.1779 17.989 21.3447 18.0156 21.4975 18.0812L27.3925 20.7225C27.5912 20.8074 27.757 20.9543 27.8651 21.1414C27.9733 21.3284 28.018 21.5454 27.9925 21.76C27.7983 23.2113 27.0836 24.5427 25.9813 25.5065C24.8791 26.4704 23.4642 27.0011 22 27C17.4913 27 13.1673 25.2089 9.97919 22.0208C6.79107 18.8327 5 14.5087 5 9.99997C4.99888 8.53573 5.5296 7.12091 6.49345 6.01864C7.45731 4.91637 8.78869 4.20167 10.24 4.00747C10.4545 3.98199 10.6716 4.02666 10.8586 4.13482C11.0456 4.24299 11.1926 4.40881 11.2775 4.60747L13.9188 10.5075C13.9836 10.659 14.0101 10.8242 13.9957 10.9885C13.9813 11.1527 13.9265 11.3108 13.8363 11.4487L11.165 14.625C11.0702 14.768 11.0142 14.9331 11.0024 15.1042C10.9906 15.2753 11.0233 15.4466 11.0975 15.6012C12.1313 17.7175 14.3188 19.8787 16.4413 20.9025C16.5967 20.9763 16.7688 21.0084 16.9404 20.9954C17.112 20.9825 17.2773 20.925 17.42 20.8287L20.5488 18.1675Z"
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
            d="M20.5488 18.1675C20.6872 18.0753 20.8465 18.0192 21.0122 18.0041C21.1779 17.989 21.3447 18.0156 21.4975 18.0812L27.3925 20.7225C27.5912 20.8074 27.757 20.9543 27.8651 21.1414C27.9733 21.3284 28.018 21.5454 27.9925 21.76C27.7983 23.2113 27.0836 24.5427 25.9813 25.5065C24.8791 26.4704 23.4642 27.0011 22 27C17.4913 27 13.1673 25.2089 9.97919 22.0208C6.79107 18.8327 5 14.5087 5 9.99997C4.99888 8.53573 5.5296 7.12091 6.49345 6.01864C7.45731 4.91637 8.78869 4.20167 10.24 4.00747C10.4545 3.98199 10.6716 4.02666 10.8586 4.13482C11.0456 4.24299 11.1926 4.40881 11.2775 4.60747L13.9188 10.5075C13.9836 10.659 14.0101 10.8242 13.9957 10.9885C13.9813 11.1527 13.9265 11.3108 13.8363 11.4487L11.165 14.625C11.0702 14.768 11.0142 14.9331 11.0024 15.1042C10.9906 15.2753 11.0233 15.4466 11.0975 15.6012C12.1313 17.7175 14.3188 19.8787 16.4413 20.9025C16.5967 20.9763 16.7688 21.0084 16.9404 20.9954C17.112 20.9825 17.2773 20.925 17.42 20.8287L20.5488 18.1675Z"
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
            d="M20.5488 18.1675C20.6872 18.0753 20.8465 18.0192 21.0122 18.0041C21.1779 17.989 21.3447 18.0156 21.4975 18.0812L27.3925 20.7225C27.5912 20.8074 27.757 20.9543 27.8651 21.1414C27.9733 21.3284 28.018 21.5454 27.9925 21.76C27.7983 23.2113 27.0836 24.5427 25.9813 25.5065C24.8791 26.4704 23.4642 27.0011 22 27C17.4913 27 13.1673 25.2089 9.97919 22.0208C6.79107 18.8327 5 14.5087 5 9.99997C4.99888 8.53573 5.5296 7.12091 6.49345 6.01864C7.45731 4.91637 8.78869 4.20167 10.24 4.00747C10.4545 3.98199 10.6716 4.02666 10.8586 4.13482C11.0456 4.24299 11.1926 4.40881 11.2775 4.60747L13.9188 10.5075C13.9836 10.659 14.0101 10.8242 13.9957 10.9885C13.9813 11.1527 13.9265 11.3108 13.8363 11.4487L11.165 14.625C11.0702 14.768 11.0142 14.9331 11.0024 15.1042C10.9906 15.2753 11.0233 15.4466 11.0975 15.6012C12.1313 17.7175 14.3188 19.8787 16.4413 20.9025C16.5967 20.9763 16.7688 21.0084 16.9404 20.9954C17.112 20.9825 17.2773 20.925 17.42 20.8287L20.5488 18.1675Z"
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
