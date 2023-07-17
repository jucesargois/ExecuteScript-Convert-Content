let flowFile = session.get();
if (flowFile != null) {
    // let StreamCallback = Java.type("org.apache.nifi.processor.io.StreamCallback");
    let IOUtils = Java.type("org.apache.commons.io.IOUtils");
	let StandardCharsets = Java.type("java.nio.charset.StandardCharsets");
	let InputStreamCallback = Java.type("org.apache.nifi.processor.io.InputStreamCallback");
	let OutputStreamCallback = Java.type("org.apache.nifi.processor.io.OutputStreamCallback");
    try {
        session.read(flowFile, new InputStreamCallback(function (inputStream) {
            let content = JSON.parse(IOUtils.toString(inputStream, StandardCharsets.UTF_8));
        }));
        let example = "test"

        session.write(flowFile, new OutputStreamCallback(function (outputStream) {
            outputStream.write(JSON.stringify(content).getBytes(StandardCharsets.UTF_8));
        }));

        session.putAttribute(flowFile, 'Example', example);
        session.transfer(flowFile, REL_SUCCESS);
    } catch (e) {
        log.error('JavaScript ERROR:\n' + e.toString());
        session.transfer(flowFile, REL_FAILURE)
    }
}
