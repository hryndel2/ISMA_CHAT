from flask import Flask, request, jsonify,render_template
import g4f

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    message = request.json['message']
    generate_image = request.json.get('generate_image', False)
    response = g4f.ChatCompletion.create(
        model="gpt-3.5-turbo",
        provider=g4f.Provider.Aichatos,
        messages=[{"role": "user", "content":message}],
        stream=True
    )
    ai_response = ''
    for message in response:
        ai_response += message
    print("AI:", ai_response)  # для проверки  / test
    return jsonify({'response': ai_response})

if __name__ == '__main__':
    app.run(debug=True)
