import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { FieldError, UseFormRegister } from "react-hook-form"
import { Textarea } from "../ui/textarea"

interface MyTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegister<any>
  errors?: Record<string, FieldError>
  registerValue: string
  label: string
  placeholder: string
}

export function MyTextArea({
  register,
  errors,
  registerValue,
  label,
  placeholder,
  ...rest
}: MyTextAreaProps) {
  const [countCharacters, setCountCharacters] = useState(0)
  const [maxCharacters, setMaxCharacters] = useState(500)
  const [minCharacters, setMinCharacters] = useState(20)

  useEffect(() => {
    setMaxCharacters(parseInt(String(rest.maxLength || "2500"), 10))
    setMinCharacters(parseInt(String(rest.minLength || "20"), 10))
  }, [rest.maxLength, rest.minLength])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCountCharacters(e.target.value.length)
  }
  return (
    <div className="flex flex-col space-y-1.5 w-full  relative">
      <Label htmlFor={registerValue}>{label}</Label>
      <Textarea
        {...register(registerValue)}
        id={registerValue}
        placeholder={placeholder}
        className="bg-white"
        {...rest}
        onChange={handleChange}
      />
      {errors?.[registerValue] && (
        <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
          {errors[registerValue]?.message}
        </span>
      )}
      <div className="absolute flex items-center text-xs bottom-1 right-2">
        <span
          className={cn(
            "text-muted-foreground",
            countCharacters < 20 && "text-red-500"
          )}
        >
          {countCharacters} / {maxCharacters}
        </span>
      </div>
    </div>
  )
}
