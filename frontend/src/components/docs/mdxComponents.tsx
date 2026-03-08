export const mdxComponents = {
  h1: (props: any) => (
    <h1 className="text-4xl font-bold mb-10 text-white" {...props} />
  ),

  h2: (props: any) => (
    <h2
      className="text-2xl font-semibold mt-14 mb-6 border-b border-neutral-800 pb-3 text-white"
      {...props}
    />
  ),

  h3: (props: any) => (
    <h3 className="text-xl font-semibold mt-10 mb-4 text-white" {...props} />
  ),

  p: (props: any) => (
    <p className="text-gray-300 text-[16px] leading-8 mb-6" {...props} />
  ),

  code: (props: any) => (
    <code
      className="bg-neutral-800 text-purple-400 px-2 py-1 rounded text-sm"
      {...props}
    />
  ),

  pre: (props: any) => (
    <pre
      className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 mb-10 overflow-x-auto text-sm"
      {...props}
    />
  ),

  ul: (props: any) => (
    <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2" {...props} />
  ),

  table: (props: any) => (
    <div className="overflow-x-auto my-10">
      <table className="w-full border border-neutral-800 text-sm" {...props} />
    </div>
  ),

  th: (props: any) => (
    <th className="border border-neutral-800 px-4 py-2 text-left" {...props} />
  ),

  td: (props: any) => (
    <td className="border border-neutral-800 px-4 py-2" {...props} />
  ),
};
