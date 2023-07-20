var flowFile = session.get();
if (flowFile != null) {
  var StreamCallback = Java.type("org.apache.nifi.processor.io.StreamCallback");
  var IOUtils = Java.type("org.apache.commons.io.IOUtils");
  var StandardCharsets = Java.type("java.nio.charset.StandardCharsets");
  var InputStreamCallback = Java.type("org.apache.nifi.processor.io.InputStreamCallback");
  var OutputStreamCallback = Java.type("org.apache.nifi.processor.io.OutputStreamCallback");
  try {
    session.read(flowFile, new InputStreamCallback(function (inputStream) {
      content = JSON.parse(IOUtils.toString(inputStream, StandardCharsets.UTF_8));
    }));
    var example = "test"
    content.squadName = "Squad Teste"
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
