import React from "react"
import { cn } from "@/lib/utils"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { FieldError, UseFormRegister } from "react-hook-form"

interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<any>
  errors?: Record<string, FieldError>
  registerValue: string
  label: string
  placeholder: string
}

export function MyInput({
  register,
  errors,
  registerValue,
  label,
  placeholder,
  ...rest
}: MyInputProps) {
  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <Label htmlFor={registerValue}>{label}</Label>
      <Input
        {...register(registerValue)}
        id={registerValue}
        placeholder={placeholder}
        className="bg-white"
        {...rest}
      />
      {errors?.[registerValue] && (
        <span className={cn("text-xs font-semibold text-red-600 -mt-2")}>
          {errors[registerValue]?.message}
        </span>
      )}
    </div>
  )
}
