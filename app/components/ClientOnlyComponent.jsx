

function ClientOnlyComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ustawienie na true po renderowaniu na kliencie
  }, []);

  if (!mounted) {
    return null; // Nie renderuj nic na serwerze
  }

  return <div>Only visible on the client</div>;
}

export default ClientOnlyComponent;