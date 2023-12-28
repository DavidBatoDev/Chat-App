export default function handleKey(e, callback) {
    e.code === 'Enter' && callback()
}