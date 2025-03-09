export default function Input(props) {
    const { type, id, value, handler, placeholder } = props;
    return <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => handler(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
    />
}