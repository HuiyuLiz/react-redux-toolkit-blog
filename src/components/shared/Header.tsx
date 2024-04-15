import { type SVGProps } from 'react'
import { type JSX } from 'react/jsx-runtime'

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 w-full border-b bg-white py-4">
      <div className="container flex items-center gap-4 text-black">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Blog</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div>
            <UserIcon className="h-4 w-4" />
            <span className="sr-only">User</span>
          </div>
        </div>
      </div>
    </header>
  )
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
