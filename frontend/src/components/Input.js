export default function Input({ label, type = "text", value, onChange, placeholder, required = false, icon }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-200">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
        }
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">
              {icon}
            </div>
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm hover:bg-white/15`}
        />
      </div>
    </div>
  );
}