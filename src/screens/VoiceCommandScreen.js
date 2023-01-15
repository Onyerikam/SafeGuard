import Voice from 'react-native-voice';

const VoiceCommandScreen = () => {
    const [recognized, setRecognized] = useState('');
    const [started, setStarted] = useState('');
    const [results, setResults] = useState([]);
    const [end, setEnd] = useState(false);

    useEffect(() => {
        Voice.onSpeechStart = (e) => {
            setStarted(true);
        };
        Voice.onSpeechRecognized = (e) => {
            setRecognized(true);
        };
        Voice.onSpeechEnd = (e) => {
            setEnd(true);
        };
        Voice.onSpeechResults = (e) => {
            setResults(e.value);
        };
    }, []);

    const startRecognizing = async () => {
        setResults([]);
        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    };

    const stopRecognizing = async () => {
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    };
    
    const handleResults = () => {
        if (results.length > 0) {
            console.log(results[0]);
            // implement code to handle specific commands here
        }
    };
    
    return (
        <View style={styles.container}>
            <Text>Voice Command</Text>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={startRecognizing}
                    title="Start"
                    disabled={started}
                />
                <Button
                    onPress={stopRecognizing}
                    title="Stop"
                    disabled={!started}
                />
                {end && (
                    <Button
                        onPress={handleResults}
                        title="Handle Results"
                        disabled={!recognized}
                    />
                )}
            </View>
            <Text>Results:</Text>
            {results.map((result) => (
                <Text key={result}>{result}</Text>
            ))}
        </View>
    );
}
const styles = StyleSheet.create({
 container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
 },
 buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
 },
});

export default VoiceCommandScreen;