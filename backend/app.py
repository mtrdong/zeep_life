from flask import Flask, request
from flask_cors import CORS

from backend.zeep_life import ZeepLife

app = Flask('ZeepLife')
CORS(app, supports_credentials=True)


@app.post('/submit')
def commit():
    account = request.form.get('account')
    password = request.form.get('password')
    step = request.form.get('step')
    zl = ZeepLife(account, password, step)
    try:
        res = zl.start()
    except Exception as e:
        return {'error': str(e), 'code': 0}
    return {'message': res, 'code': 1}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
