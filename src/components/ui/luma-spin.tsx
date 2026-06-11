export const Component = () => {
  return (
    <div
      className="relative aspect-square w-[65px]"
      role="status"
      aria-label="Loading"
    >
      <span className="luma-spin-segment absolute rounded-[50px]" aria-hidden="true" />
      <span
        className="luma-spin-segment luma-spin-delay absolute rounded-[50px]"
        aria-hidden="true"
      />
      <span className="sr-only">Loading</span>

      <style>{`
        @keyframes lumaLoaderAnim {
          0% {
            inset: 0 35px 35px 0;
          }
          12.5% {
            inset: 0 35px 0 0;
          }
          25% {
            inset: 35px 35px 0 0;
          }
          37.5% {
            inset: 35px 0 0 0;
          }
          50% {
            inset: 35px 0 0 35px;
          }
          62.5% {
            inset: 0 0 0 35px;
          }
          75% {
            inset: 0 0 35px 35px;
          }
          87.5% {
            inset: 0 0 35px 0;
          }
          100% {
            inset: 0 35px 35px 0;
          }
        }

        .luma-spin-segment {
          animation: lumaLoaderAnim 2.5s infinite;
          box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.94);
        }

        .luma-spin-delay {
          animation-delay: -1.25s;
        }
      `}</style>
    </div>
  );
};

export const LumaSpin = Component;
