"use client"

import * as React from "react"
import {
  Avatar as AvatarPrimitive,
  AvatarImage as AvatarImagePrimitive,
  AvatarFallback as AvatarFallbackPrimitive,
} from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarImagePrimitive>,
  React.ComponentPropsWithoutRef<typeof AvatarImagePrimitive>
>(({ className, ...props }, ref) => (
  <AvatarImagePrimitive ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
))
AvatarImage.displayName = AvatarImagePrimitive.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarFallbackPrimitive>,
  React.ComponentPropsWithoutRef<typeof AvatarFallbackPrimitive>
>(({ className, ...props }, ref) => (
  <AvatarFallbackPrimitive
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
))
AvatarFallback.displayName = AvatarFallbackPrimitive.displayName

export { Avatar, AvatarImage, AvatarFallback }

