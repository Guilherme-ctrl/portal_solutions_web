import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:portal_solutions_web/core/colors/portal_colors.dart';
import 'package:portal_solutions_web/widget/contact_session.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(const PortalSolutionsApp());
}

class PortalSolutionsApp extends StatelessWidget {
  const PortalSolutionsApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Portal Solutions',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: PortalColors.backgroundDark,
        textTheme: GoogleFonts.openSansTextTheme(
          ThemeData.dark().textTheme,
        ),
        colorScheme: ColorScheme.fromSwatch().copyWith(
          primary: PortalColors.portalBlue,
          brightness: Brightness.dark,
        ),
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

/// Usamos SingleTickerProviderStateMixin ou TickerProviderStateMixin
/// para controlar animações sem usar NavigatorState()
class _HomePageState extends State<HomePage> with TickerProviderStateMixin {
  late AnimationController _heroController;
  late Animation<double> _heroFade;

  late AnimationController _servicesController;
  late Animation<double> _servicesFade;

  late AnimationController _contactController;
  late Animation<double> _contactFade;

  @override
  void initState() {
    super.initState();

    // HERO Section
    _heroController = AnimationController(
      vsync: this, // corrigido
      duration: const Duration(milliseconds: 800),
    );
    _heroFade = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _heroController, curve: Curves.easeIn),
    );
    // Dispara a animação do Hero imediatamente
    _heroController.forward();

    // SERVICES Section
    _servicesController = AnimationController(
      vsync: this, // corrigido
      duration: const Duration(milliseconds: 800),
    );
    _servicesFade = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _servicesController, curve: Curves.easeIn),
    );

    // CONTACT Section
    _contactController = AnimationController(
      vsync: this, // corrigido
      duration: const Duration(milliseconds: 800),
    );
    _contactFade = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _contactController, curve: Curves.easeIn),
    );

    // Dispara as animações em sequência, com checagem de mounted
    // SERVICES (depois de 500ms)
    Future.delayed(const Duration(milliseconds: 500), () {
      if (!mounted) return; // se tiver desmontado, não faz nada
      _servicesController.forward();
    });

    // CONTACT (depois de 1000ms)
    Future.delayed(const Duration(milliseconds: 1000), () {
      if (!mounted) return; // se tiver desmontado, não faz nada
      _contactController.forward();
    });
  }

  @override
  void dispose() {
    // Dispose de todos os controllers
    _heroController.dispose();
    _servicesController.dispose();
    _contactController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Barra superior minimalista
      appBar: AppBar(
        backgroundColor: PortalColors.portalBlue,
        elevation: 0,
        title: Row(
          children: [
            // Logo SVG
            SizedBox(
              width: 60,
              height: 60,
              child: Image.asset(
                'images/logo_portal.png',
              ),
            ),
            const SizedBox(width: 8),
            Text(
              'Portal Solutions',
              style: GoogleFonts.openSans(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: PortalColors.textLight,
              ),
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Seção HERO
            FadeTransition(
              opacity: _heroFade,
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 100, horizontal: 40),
                child: Column(
                  children: [
                    Text(
                      'Transformando ideias em grandes aplicativos',
                      textAlign: TextAlign.center,
                      style: GoogleFonts.openSans(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: PortalColors.textLight,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Somos especialistas em desenvolvimento mobile para Android e iOS. '
                      'Entregamos soluções robustas e eficientes para o seu negócio.',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 16,
                        color: PortalColors.textLight.withOpacity(0.8),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Seção SERVIÇOS
            FadeTransition(
              opacity: _servicesFade,
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 40),
                child: Column(
                  children: [
                    Text(
                      'Nossos Serviços',
                      style: GoogleFonts.openSans(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: PortalColors.textLight,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Da concepção até a implantação, oferecemos soluções sob medida em tecnologia.',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 16,
                        color: PortalColors.textLight.withOpacity(0.7),
                      ),
                    ),
                    const SizedBox(height: 40),
                    Wrap(
                      alignment: WrapAlignment.center,
                      spacing: 20,
                      runSpacing: 20,
                      children: const [
                        _ServiceCard(
                          iconData: Icons.phone_android,
                          title: 'Apps Mobile',
                          description: 'Android e iOS com Flutter, performance nativa.',
                        ),
                        _ServiceCard(
                          iconData: Icons.web,
                          title: 'Sistemas Web',
                          description: 'Aplicações responsivas e escaláveis.',
                        ),
                        _ServiceCard(
                          iconData: Icons.cloud,
                          title: 'Infra em Nuvem',
                          description: 'Deploy seguro, CI/CD e monitoramento 24/7.',
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            // Seção CONTATO
            FadeTransition(opacity: _contactFade, child: ContactSection()),

            // Rodapé
            Container(
              width: double.infinity,
              color: Colors.black54,
              padding: const EdgeInsets.all(16),
              child: Text(
                '© 2025 Portal Solutions - Todos os direitos reservados',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: PortalColors.textLight.withOpacity(0.6),
                  fontSize: 14,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Exemplo de um Card minimalista para serviços
class _ServiceCard extends StatelessWidget {
  final IconData iconData;
  final String title;
  final String description;

  const _ServiceCard({
    Key? key,
    required this.iconData,
    required this.title,
    required this.description,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 260,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: PortalColors.backgroundDark,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: PortalColors.portalBlue.withOpacity(0.2)),
      ),
      child: Column(
        children: [
          Icon(iconData, size: 40, color: PortalColors.portalBlue),
          const SizedBox(height: 16),
          Text(
            title,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: PortalColors.textLight,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            description,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              color: PortalColors.textLight.withOpacity(0.8),
            ),
          ),
        ],
      ),
    );
  }
}
