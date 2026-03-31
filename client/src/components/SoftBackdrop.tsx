export default function SoftBackdrop() {
    return (
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-black">
            <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
            <div className="absolute right-1/4 bottom-1/4 translate-x-1/4 translate-y-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-secondary/20 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-4000" />
        </div>
    )
}