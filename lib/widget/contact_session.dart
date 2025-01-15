import 'package:flutter/material.dart';
import 'package:portal_solutions_web/core/colors/portal_colors.dart';
import 'package:url_launcher/url_launcher.dart';

class ContactSection extends StatelessWidget {
  const ContactSection({Key? key}) : super(key: key);

  // Função para abrir o WhatsApp
  Future<void> _openWhatsApp() async {
    final Uri whatsappLink = Uri.parse("https://api.whatsapp.com/send?phone=5547933803750");
    if (await canLaunchUrl(whatsappLink)) {
      await launchUrl(whatsappLink, mode: LaunchMode.externalApplication);
    } else {
      throw "Could not launch $whatsappLink";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 60, horizontal: 40),
      // Aqui, por exemplo, um fundo translúcido
      color: Colors.blue.withOpacity(0.1),
      child: Column(
        children: [
          Text(
            'Contato',
          ),
          const SizedBox(height: 16),
          Text(
            'Fale conosco para discutir seu projeto e obter um orçamento personalizado.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              color: Colors.white.withOpacity(0.7),
            ),
          ),
          const SizedBox(height: 40),
          ElevatedButton(
            onPressed: () {
              // Ao clicar, abre um AlertDialog (pop-up)
              showDialog(
                context: context,
                builder: (context) {
                  return AlertDialog(
                    backgroundColor: PortalColors.portalBlue,
                    title: const Text("Solicitar Orçamento"),
                    content: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Text(
                          "Telefone (WhatsApp):\n(47) 93380-3750",
                          style: TextStyle(fontSize: 16),
                        ),
                        const SizedBox(height: 16),
                        ElevatedButton.icon(
                          icon: Icon(Icons.message),
                          label: const Text("Chamar no WhatsApp"),
                          onPressed: _openWhatsApp,
                        ),
                      ],
                    ),
                    actions: [
                      TextButton(
                        onPressed: () => Navigator.pop(context),
                        child: const Text(
                          "Fechar",
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                    ],
                  );
                },
              );
            },
            child: const Text('Solicitar Orçamento'),
          ),
        ],
      ),
    );
  }
}
