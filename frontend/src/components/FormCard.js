export default function FormCard({ title, children, icon }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-300">
      <div className="flex items-center mb-6">
        {icon && (
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            {icon}
          </div>
        )}
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}