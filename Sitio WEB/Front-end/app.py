from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# --- RUTA PRINCIPAL (HOME) ---
# Cuando alguien entre a la página, Python busca el HTML en la carpeta 'templates'
@app.route('/')
def home():
    return render_template('index.html')

# --- RUTA API PARA AGENDAR (CEREBRO) ---
# Aquí llegarán los datos del formulario antes de ir a WhatsApp
@app.route('/process_booking', methods=['POST'])
def process_booking():
    data = request.get_json()
    
    # 1. Capturamos los datos
    nombre = data.get('name')
    servicio = data.get('service')
    mensaje = data.get('message', '') # Si no hay mensaje, queda vacío
    
    print(f"🌟 NUEVA SOLICITUD: {nombre} quiere {servicio}")
    
    # 2. Construimos el mensaje de WhatsApp (Más limpio y seguro desde el Backend)
    phone_number = "573042466814"
    base_text = f"👑 *Hola Sharlotte Styles* 👑\n\nSoy *{nombre}* y deseo agendar una cita.\n✨ Servicio: *{servicio}*\n"
    
    if mensaje:
        base_text += f"📝 Nota: {mensaje}\n\n"
        
    base_text += "Quedo atenta/o a su respuesta. ✨"
    
    # Codificamos el texto para URL (cambia espacios por %20, etc.)
    import urllib.parse
    encoded_text = urllib.parse.quote(base_text)
    
    whatsapp_url = f"https://wa.me/{phone_number}?text={encoded_text}"
    
    # 3. Le devolvemos el link al Javascript
    return jsonify({
        'status': 'success',
        'whatsapp_link': whatsapp_url
    })

# --- ENCENDER SERVIDOR ---
if __name__ == '__main__':
    # debug=True hace que si cambias algo, se actualice solo
    app.run(debug=True, port=5000)