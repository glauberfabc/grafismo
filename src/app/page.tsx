'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Heart, Trophy, AlertCircle, Target, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import './pulse.css'

interface Question {
  id: number
  text: string
  options: Array<{
    id: string
    text: string
    points: number
    feedback: string
  }>
}

interface QuizResult {
  title: string
  description: string
  icon: JSX.Element
  color: string
  recommendation: string
}

const getQuizResult = (totalScore: number): QuizResult => {
  if (totalScore >= 180) {
    return {
      title: "🚀 Pronto para Evoluir!",
      description: "Seu filho(a) tem um potencial incrível esperando para ser desbloqueado! As observações que você fez indicam que este é o momento perfeito para investir no Kit de Atividades de Grafismo Fonético.",
      icon: <Rocket className="w-8 h-8 text-purple-600" />,
      color: "bg-purple-100 border-purple-300",
      recommendation: "Recomendamos fortemente adquirir o Kit AGORA mesmo! Seu filho(a) está no ponto ideal para absorver todas as técnicas e ter resultados surpreendentes em pouco tempo."
    }
  } else if (totalScore >= 140) {
    return {
      title: "⚠️ Precisa de Atenção Urgente!",
      description: "Os sinais que você observou são claros indicativos de que seu filho(a) precisa de intervenção especializada imediata. Quanto mais cedo agir, mais fácil será superar essas dificuldades.",
      icon: <AlertCircle className="w-8 h-8 text-red-600" />,
      color: "bg-red-100 border-red-300",
      recommendation: "Ação imediata é essencial! O Kit de Atividades de Grafismo Fonético foi desenvolvido exatamente para os casos como o do seu filho(a). Não perca mais tempo!"
    }
  } else {
    return {
      title: "💡 Está no Caminho, mas pode Melhorar!",
      description: "Você já está atento(a) às necessidades do seu filho(a), o que é maravilhoso! Com as ferramentas certas, você pode acelerar significativamente o desenvolvimento e evitar frustrações futuras.",
      icon: <Target className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-100 border-blue-300",
      recommendation: "O Kit de Atividades de Grafismo Fonético complementará perfeitamente seu cuidado e atenção, dando ao seu filho(a) a base sólida que ele(a) merece."
    }
  }
}

// Componente de diálogo de upgrade
const UpgradeDialog = ({ showUpgradeDialog, setShowUpgradeDialog }: { 
  showUpgradeDialog: boolean; 
  setShowUpgradeDialog: (show: boolean) => void; 
}) => (
  <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
    <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto p-4">
      <DialogHeader className="pb-2">
        <DialogTitle className="text-lg font-bold text-center text-purple-800">
          🎉 Oferta Exclusiva para Você!
        </DialogTitle>
        <DialogDescription className="text-center text-gray-600 text-sm">
          Antes de finalizar, temos uma oferta especial que não pode perder!
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-3">
        {/* Comparação Visual */}
        <div className="grid grid-cols-2 gap-3">
          {/* Kit Básico */}
          <div className="border-2 border-gray-200 rounded-lg p-2 text-center">
            <div className="text-base font-bold text-gray-800 mb-1">Kit Básico</div>
            <div className="text-xl font-bold text-gray-900 mb-1">R$5,70</div>
            <div className="text-xs text-gray-600 mb-2">3 benefícios</div>
            <div className="space-y-1 text-xs">
              <div>✅ Atividades de Grafismo Fonético</div>
              <div>✅ Garantia 7 dias</div>
              <div>✅ Suporte</div>
            </div>
          </div>
          
          {/* Kit Completo */}
          <div className="border-2 border-purple-400 rounded-lg p-2 text-center relative bg-purple-50">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap">
              MELHOR OFERTA
            </div>
            <div className="text-base font-bold text-purple-800 mb-1">Kit Completo</div>
            <div className="text-xl font-bold text-purple-900 mb-1">
              <span className="line-through text-gray-500 text-xs block">R$36,90</span>
              <span className="text-green-600 text-base">R$27,90</span>
            </div>
            <div className="text-xs text-purple-600 mb-2">18 benefícios</div>
            <div className="space-y-1 text-xs">
              <div>✅ 1200 Atividades</div>
              <div>✅ 15 Jogos</div>
              <div>✅ 6 Bônus</div>
              <div className="text-green-600 font-bold">+ mais!</div>
            </div>
          </div>
        </div>
        
        {/* Benefícios do Upgrade - Versão Ultra Compacta */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-lg">
          <h4 className="font-bold text-purple-800 mb-1 text-center text-xs">
            Por que fazer o upgrade?
          </h4>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div className="flex items-center gap-1">
              <span className="text-purple-600 text-sm">💎</span>
              <span>Economia R$9,00</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-purple-600 text-sm">🎮</span>
              <span>6x mais conteúdo</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-purple-600 text-sm">🆕</span>
              <span>Atualizações</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-purple-600 text-sm">🏆</span>
              <span>Resultados 3x mais rápidos</span>
            </div>
          </div>
        </div>
        
        {/* Lista Detalhada em Accordion Ultra Compacto */}
        <div className="border border-purple-200 rounded-lg">
          <details className="group">
            <summary className="flex items-center justify-between p-2 cursor-pointer bg-purple-50 rounded-t-lg hover:bg-purple-100 transition-colors">
              <span className="font-medium text-purple-800 text-xs">
                📋 Ver todos os 18 benefícios
              </span>
              <span className="text-purple-600 group-open:rotate-180 transition-transform text-xs">▼</span>
            </summary>
            <div className="p-2 bg-white border-t border-purple-200 max-h-40 overflow-y-auto">
              <div className="grid grid-cols-1 gap-1 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">1200 Atividades Alfabetização</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">Dominó Numérico (NOVO)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">Quebra-cabeça Numérico (NOVO)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">Labirinto do Alfabeto</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">Jogo da Memória</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">Atualizações com Novos Jogos</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">Bônus – Quebra-cabeça Matemático</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">Bônus – Bingo do Alfabeto</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">Coordenação Motora 2.0</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">Aventura da Matemática</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">Complete as Palavras</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">Formas Geométricas</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">Qual letra Começa o Nome?</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">Bônus – Ajude Chegar ao Destino (NOVO)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">Bônus – Complete Letras e Números (NOVO)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">GARANTIA DE 7 DIAS</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs">✅</span>
                  <span className="text-xs">SUPORTE</span>
                </div>
              </div>
            </div>
          </details>
        </div>
        
        {/* Timer de urgência */}
        <div className="text-center">
          <div className="text-xs text-red-600 font-bold">
            ⏰ Oferta por tempo limitado!
          </div>
          <div className="text-xs text-gray-500">
            Esta oferta desaparece quando você fechar esta janela
          </div>
        </div>
      </div>
      
      <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
        <Button 
          variant="outline" 
          onClick={() => {
            setShowUpgradeDialog(false)
            window.open('https://flownetic-digital.mycartpanda.com/checkout/191852943:1', '_blank')
          }}
          className="sm:w-auto text-xs h-8"
        >
          Não, quero só o básico
        </Button>
        <Button 
          onClick={() => {
            setShowUpgradeDialog(false)
            window.open('https://flownetic-digital.mycartpanda.com/checkout/192835605:1', '_blank')
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white sm:w-auto pulse-button text-xs h-8"
        >
          <Sparkles className="w-3 h-3 mr-1" />
          Adquira Já
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export default function QuizInterativo() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<{[key: number]: string}>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [currentFeedback, setCurrentFeedback] = useState('')
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [carouselApi, setCarouselApi] = useState<any>(null)
  const [testimonialsCarouselApi, setTestimonialsCarouselApi] = useState<any>(null)

  const questions: Question[] = [
    {
      id: 1,
      text: "Olá! Sou o Professor Alex, especialista em desenvolvimento infantil. Vamos descobrir juntos como está a jornada de aprendizado do seu pequeno(a)? Você está pronto(a) para começar esta aventura?",
      options: [
        {
          id: "a",
          text: "Sim, estou muito curioso(a)!",
          points: 20,
          feedback: "Ótimo! Essa curiosidade é o primeiro passo para ajudar seu filho(a) a desenvolver todo o seu potencial! ✨"
        },
        {
          id: "b",
          text: "Claro, quero entender melhor como ajudar meu filho(a)",
          points: 20,
          feedback: "Perfeito! Pais como você, que buscam conhecimento, fazem toda a diferença no desenvolvimento dos filhos! 🌟"
        },
        {
          id: "c",
          text: "Sim, mas estou um pouco ansioso(a)",
          points: 10,
          feedback: "Entendo perfeitamente! É normal sentir ansiedade, mas saiba que já está no caminho certo ao buscar informações! 💪"
        }
      ]
    },
    {
      id: 2,
      text: "Como você descreveria a forma como seu filho(a) segura o lápis ou caneta ao desenhar ou tentar escrever?",
      options: [
        {
          id: "a",
          text: "Segura de forma firme e adequada para a idade",
          points: 10,
          feedback: "Isso mostra que seu filho(a) já tem uma boa base! Mas ainda há espaço para desenvolver mais precisão e confiança. 👍"
        },
        {
          id: "b",
          text: "Segura de forma um pouco desajeitada, troca de mãos com frequência",
          points: 20,
          feedback: "Atenção: Este é um sinal claro que seu filho(a) precisa desenvolver melhor a coordenação motora fina. É exatamente para isso que o Kit foi criado! 🎯"
        },
        {
          id: "c",
          text: "Tem muita dificuldade, parece desconfortável ou desiste rápido",
          points: 30,
          feedback: "Isso indica uma necessidade urgente de intervenção! Seu filho(a) está pedindo ajuda através dessas dificuldades. O Kit pode transformar essa realidade! 🚨"
        }
      ]
    },
    {
      id: 3,
      text: "Quando seu filho(a) tenta escrever letras ou números, o que você observa?",
      options: [
        {
          id: "a",
          text: "Consegue escrever algumas letras, mas com tamanho irregular e pouco controle",
          points: 20,
          feedback: "Seu filho(a) está no caminho certo, mas precisa de mais prática direcionada para desenvolver fluência e precisão! 📝"
        },
        {
          id: "b",
          text: "Faz rabiscos que não se parecem com letras, ou desiste rápido da atividade",
          points: 30,
          feedback: "Este é um indicativo importante de que faltam as bases do grafismo. Sem essas habilidades, a alfabetização se torna muito mais difícil! ⚠️"
        },
        {
          id: "c",
          text: "Escreve algumas letras claras, mas com dificuldade em juntá-las para formar palavras",
          points: 20,
          feedback: "Isso mostra que seu filho(a) tem potencial, mas precisa de atividades específicas para conectar o grafismo com a fonética! 🔤"
        }
      ]
    },
    {
      id: 4,
      text: "Como é a concentração do seu filho(a) durante atividades que envolvem escrita ou desenho?",
      options: [
        {
          id: "a",
          text: "Concentra-se por 5-10 minutos, mas depois perde o interesse",
          points: 20,
          feedback: "Essa dificuldade de concentração é comum, mas pode ser superada com atividades lúdicas e estruturadas como as do Kit! ⏱️"
        },
        {
          id: "b",
          text: "Fica muito agitado(a), não consegue ficar quieto(a) nem 2 minutos",
          points: 30,
          feedback: "Essa agitação pode ser um sinal de que as atividades atuais não estão engajando seu filho(a) da forma certa. O Kit usa abordagem que capta a atenção naturalmente! 🎯"
        },
        {
          id: "c",
          text: "Concentra-se bem, mas parece frustrado(a) com os resultados",
          points: 20,
          feedback: "A frustração mostra que seu filho(a) quer acertar, mas falta a técnica adequada. O Kit oferece o caminho para transformar essa frustração em orgulho! 😊"
        }
      ]
    },
    {
      id: 5,
      text: "Seu filho(a) demonstra interesse em aprender a escrever ou prefere evitar essas atividades?",
      options: [
        {
          id: "a",
          text: "Mostra interesse, mas desiste quando enfrenta dificuldades",
          points: 20,
          feedback: "O interesse está aí, e isso é maravilhoso! Agora só falta dar as ferramentas certas para transformar esse interesse em conquistas reais! 💫"
        },
        {
          id: "b",
          text: "Evita atividades de escrita, diz que não gosta ou que é difícil",
          points: 30,
          feedback: "Quando uma criança evita algo, geralmente é porque se sente incapaz. O Kit foi desenhado justamente para transformar essa relação com a escrita! 🌈"
        },
        {
          id: "c",
          text: "Gosta de desenhar, mas tem resistência em tentar escrever letras",
          points: 20,
          feedback: "Desenhar é o primeiro passo! Seu filho(a) já tem a motricidade, só precisa da ponte entre o desenho e a escrita que o Kit proporciona! 🎨"
        }
      ]
    },
    {
      id: 6,
      text: "Maria, mãe do Pedro de 6 anos, disse que antes do Kit ele tinha dificuldade até para segurar o lápis, mas em 2 meses já escrevia seu nome com confiança. Se seu filho tivesse essa evolução, o que você sentiria?",
      options: [
        {
          id: "a",
          text: "Alívio e alegria em ver meu filho superando suas dificuldades",
          points: 20,
          feedback: "Esse alívio que você deseja sentir está ao seu alcance! Assim como Maria, você pode testemunhar essa transformação em seu filho! 😍"
        },
        {
          id: "b",
          text: "Orgulho imenso de ver meu filho mais confiante e capaz",
          points: 20,
          feedback: "O orgulho de ver seu filho(a) superando desafios é indescritível! E essa é a realidade que centenas de pais já vivenciaram com o Kit! 🏆"
        },
        {
          id: "c",
          text: "Tranquilidade sabendo que meu filho não ficará para trás na escola",
          points: 20,
          feedback: "Essa tranquilidade é o que todos os pais desejam! Investir no desenvolvimento do seu filho(a) agora é garantir um futuro acadêmico mais sereno! 🕊️"
        },
        {
          id: "d",
          text: "Esperança renovada no potencial do meu filho",
          points: 20,
          feedback: "A esperança se transforma em realidade quando agimos com as ferramentas certas! O Kit é exatamente essa ferramenta transformadora! ✨"
        }
      ]
    },
    {
      id: 7,
      text: "Você sabia que o período entre 4 e 8 anos é a janela de ouro para desenvolver habilidades de grafismo? Depois disso, corrigir vícios fica muito mais difícil. Como você se sente sobre essa informação?",
      options: [
        {
          id: "a",
          text: "Preocupado(a), sinto que estou perdendo tempo precioso",
          points: 30,
          feedback: "Sua preocupação é válida e importante! Mas a boa notícia é que ainda está a tempo de agir. Cada dia conta nessa fase crucial! ⏰"
        },
        {
          id: "b",
          text: "Motivado(a) a agir agora enquanto meu filho está nessa fase",
          points: 20,
          feedback: "Essa motivação é exatamente o que seu filho(a) precisa! Pais proativos como você fazem toda a diferença no desenvolvimento infantil! 💪"
        },
        {
          id: "c",
          text: "Ansioso(a) para encontrar a solução certa para ajudar meu filho",
          points: 20,
          feedback: "Sua ansiedade mostra o quanto você se importa! E a boa notícia é que a solução que você busca existe e está ao seu alcance! 🎯"
        }
      ]
    },
    {
      id: 8,
      text: "Imagine seu filho(a) daqui a 3 meses, escrevendo com confiança, sem frustração, e até mesmo mostrando orgulho de suas conquistas. O que você está disposto(a) a fazer hoje para transformar essa visão em realidade?",
      options: [
        {
          id: "a",
          text: "Investir nas ferramentas certas que garantirão esse desenvolvimento",
          points: 30,
          feedback: "Essa decisão inteligente é o primeiro passo para transformar o futuro do seu filho(a)! Investir em educação é o melhor presente que um pai pode dar! 🎁"
        },
        {
          id: "b",
          text: "Buscar orientação especializada e materiais adequados",
          points: 20,
          feedback: "Sua busca por orientação mostra que você é um pai/mãe excepcional! O Kit oferece exatamente essa orientação especializada de forma acessível! 📚"
        },
        {
          id: "c",
          text: "Dedicar tempo diário para atividades estruturadas com meu filho",
          points: 20,
          feedback: "Seu comprometimento é admirável! Com as ferramentas certas, esse tempo dedicado se transformará em resultados visíveis e duradouros! ⭐"
        }
      ]
    }
  ]

  const handleAnswer = (optionId: string) => {
    const question = questions[currentQuestion]
    const selectedOption = question.options.find(opt => opt.id === optionId)
    
    if (selectedOption) {
      setAnswers(prev => ({ ...prev, [currentQuestion]: optionId }))
      setScore(prev => prev + selectedOption.points)
      setCurrentFeedback(selectedOption.feedback)
      setShowFeedback(true)
    }
  }

  const nextQuestion = () => {
    setShowFeedback(false)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setQuizCompleted(true)
      setTimeout(() => setShowResult(true), 1000)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setAnswers({})
    setShowFeedback(false)
    setCurrentFeedback('')
    setQuizCompleted(false)
    setShowResult(false)
  }

  // Auto-rotation for carousel
  useEffect(() => {
    if (!carouselApi) return

    const interval = setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext()
      } else {
        carouselApi.scrollTo(0)
      }
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [carouselApi])

  // Auto-rotation for testimonials carousel
  useEffect(() => {
    if (!testimonialsCarouselApi) return

    const interval = setInterval(() => {
      if (testimonialsCarouselApi.canScrollNext()) {
        testimonialsCarouselApi.scrollNext()
      } else {
        testimonialsCarouselApi.scrollTo(0)
      }
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [testimonialsCarouselApi])

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const result = getQuizResult(score)

  if (showResult) {
    return (
      <>
        <UpgradeDialog 
          showUpgradeDialog={showUpgradeDialog} 
          setShowUpgradeDialog={setShowUpgradeDialog} 
        />
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4">
          <div className="max-w-2xl mx-auto">
            <Card className={`${result.color} border-2 shadow-lg`}>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {result.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  {result.title}
                </CardTitle>
                <CardDescription className="text-lg text-gray-700">
                  {result.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Carrossel de Imagens */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">
                    🎨 Veja o Kit em Ação!
                  </h3>
                  <Carousel 
                    className="w-full max-w-md mx-auto"
                    setApi={setCarouselApi}
                  >
                    <CarouselContent>
                      <CarouselItem>
                        <div className="p-1">
                          <img 
                            src="https://i.postimg.cc/VLLzhw2W/3434d406be618243f921f3e0b42d35fa.jpg" 
                            alt="Kit em Ação 1" 
                            className="w-full h-96 object-contain rounded-lg shadow-md"
                          />
                        </div>
                      </CarouselItem>
                      <CarouselItem>
                        <div className="p-1">
                          <img 
                            src="https://i.postimg.cc/4yws32Hc/457eb1079313d090ae896bc4f8a0b184.jpg" 
                            alt="Kit em Ação 2" 
                            className="w-full h-96 object-contain rounded-lg shadow-md"
                          />
                        </div>
                      </CarouselItem>
                      <CarouselItem>
                        <div className="p-1">
                          <img 
                            src="https://i.postimg.cc/FR59CLQY/5ca638fdb913e65694cbbfa72cb3c781.jpg" 
                            alt="Kit em Ação 3" 
                            className="w-full h-96 object-contain rounded-lg shadow-md"
                          />
                        </div>
                      </CarouselItem>
                      <CarouselItem>
                        <div className="p-1">
                          <img 
                            src="https://i.postimg.cc/85RT2z1t/7a622f663000b47b120a81909f2d8196.jpg" 
                            alt="Kit em Ação 4" 
                            className="w-full h-96 object-contain rounded-lg shadow-md"
                          />
                        </div>
                      </CarouselItem>
                      <CarouselItem>
                        <div className="p-1">
                          <img 
                            src="https://i.postimg.cc/h40SMvZG/8aa8ed3a7c506fc8dbce919cb9f2125e.jpg" 
                            alt="Kit em Ação 5" 
                            className="w-full h-96 object-contain rounded-lg shadow-md"
                          />
                        </div>
                      </CarouselItem>
                      <CarouselItem>
                        <div className="p-1">
                          <img 
                            src="https://i.postimg.cc/gjGGmbjd/8cd237c8f6ff2d877afeb68a98f33a32.jpg" 
                            alt="Kit em Ação 6" 
                            className="w-full h-96 object-contain rounded-lg shadow-md"
                          />
                        </div>
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-2" />
                    <CarouselNext className="mr-2" />
                  </Carousel>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    🔄 Apresentação automática das atividades do Kit
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    Sua pontuação: {score}/200
                  </div>
                  <div className="flex justify-center gap-2 mb-4">
                    <Badge variant="secondary" className="text-sm">
                      <img 
                        src="/logo-kit.png" 
                        alt="Kit Logo" 
                        className="w-4 h-4 mr-1 object-contain"
                      />
                      {score >= 180 ? "Excelente!" : score >= 140 ? "Atenção!" : "Bom!"}
                    </Badge>
                  </div>
                </div>
                
                <div className="bg-white/70 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    Recomendação Especial:
                  </h3>
                  <p className="text-gray-700">{result.recommendation}</p>
                </div>

                {/* Carrossel de Depoimentos */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">
                    💬 Depoimentos de Quem Já Usou o Kit!
                  </h3>
                  <Carousel 
                    className="w-full max-w-md mx-auto"
                    setApi={setTestimonialsCarouselApi}
                  >
                    <CarouselContent>
                      <CarouselItem>
                        <div className="p-1">
                          <img 
                            src="https://i.postimg.cc/3rLwYWXc/img-0136-1.png" 
                            alt="Depoimento 1" 
                            className="w-full h-96 object-contain rounded-lg shadow-md"
                          />
                        </div>
                      </CarouselItem>
                      <CarouselItem>
                        <div className="p-1">
                          <img 
                            src="https://i.postimg.cc/7hQPVQPk/img-0136-2.png" 
                            alt="Depoimento 2" 
                            className="w-full h-96 object-contain rounded-lg shadow-md"
                          />
                        </div>
                      </CarouselItem>
                      <CarouselItem>
                        <div className="p-1">
                          <img 
                            src="https://i.postimg.cc/yxNY0zHj/img-0136-3.png" 
                            alt="Depoimento 3" 
                            className="w-full h-96 object-contain rounded-lg shadow-md"
                          />
                        </div>
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-2" />
                    <CarouselNext className="mr-2" />
                  </Carousel>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    🔄 Depoimentos reais de famílias satisfeitas
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-bold text-gray-800 mb-3 text-center">
                    🎁 Transforme o Resultado do Quiz em Realidade!
                  </h3>
                  <p className="text-gray-700 mb-4 text-sm">
                    O Kit de Atividades de Grafismo Fonético foi desenvolvido por especialistas em educação infantil 
                    para ajudar exatamente crianças como a sua. Com métodos comprovados e atividades lúdicas, 
                    seu filho(a) desenvolverá:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 mb-4">
                    <li>• Coordenação motora fina precisa</li>
                    <li>• Confiança na escrita</li>
                    <li>• Habilidade de conectar letras a sons</li>
                    <li>• Concentração prolongada em atividades</li>
                    <li>• Autoestima e orgulho das conquistas</li>
                  </ul>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-700 mb-2">
                      Oferta Especial para Participantes do Quiz!
                    </div>
                    
                    {/* Cards de Ofertas */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Card Básico */}
                      <Card className="border-2 border-gray-200 hover:border-gray-300 transition-colors">
                        <CardHeader className="text-center bg-gray-50">
                          <CardTitle className="text-xl font-bold text-gray-800">
                            Kit Básico
                          </CardTitle>
                          <div className="text-3xl font-bold text-gray-900">
                            R$5,70
                          </div>
                          <p className="text-sm text-gray-600">
                            À vista no PIX
                          </p>
                        </CardHeader>
                        <CardContent className="p-4">
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>Livro de Atividades de Grafismo Fonético</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>GARANTIA DE 7 DIAS</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>SUPORTE</span>
                            </li>
                          </ul>
                          <Button 
                            variant="outline" 
                            className="w-full mt-4 border-gray-300 text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowUpgradeDialog(true)}
                          >
                            Escolher Básico
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Card Destaque */}
                      <Card className="border-2 border-purple-400 hover:border-purple-500 transition-all transform hover:scale-105 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-1 text-xs font-bold">
                          OFERTA MAIS COMPLETA
                        </div>
                        <CardHeader className="text-center bg-gradient-to-r from-purple-50 to-pink-50 pt-8">
                          <CardTitle className="text-xl font-bold text-purple-800">
                            Kit Completo
                          </CardTitle>
                          <div className="text-3xl font-bold text-purple-900">
                            R$36,90
                          </div>
                          <p className="text-sm text-purple-600">
                            À vista no PIX
                          </p>
                          <div className="inline-block bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                            ECONOMIZE 70%
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>1200 Atividades Alfabetização</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>Dominó Numérico (NOVO)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>Quebra – cabeça Numérico (NOVO)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>Labirinto do Alfabeto</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>Jogo da Memória</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>ATUALIZAÇÕES COM NOVOS JOGOS</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>Bônus – Quebra-cabeça Matemático</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>Bônus – Bingo do Alfabeto</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>Coordenação Motora 2.0</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>Aventura da Matemática</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>Complete as Palavras</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>Formas Geométricas</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>Qual letra Começa o Nome?</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>BÔNUS – Ajude Chegar ao Destino (NOVO)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>BÔNUS – Complete as Letras e Números (NOVO)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>GARANTIA DE 30 DIAS</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-green-600">✅</span>
                              <span>SUPORTE</span>
                            </li>
                          </ul>
                          <Button 
                            size="lg" 
                            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 text-lg shadow-lg transform hover:scale-105 transition-all duration-200 pulse-button"
                            onClick={() => window.open('https://flownetic-digital.mycartpanda.com/checkout/192834624:1', '_blank')}
                          >
                            <Sparkles className="w-5 h-5 mr-2" />
                            Adquira Já
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <p className="text-xs text-gray-600 mt-2">
                      Garantia de 30 dias ou seu dinheiro de volta
                    </p>
                    
                    {/* WhatsApp Button */}
                    <div className="mt-4 text-center">
                      <Button 
                        variant="outline" 
                        className="bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600"
                        onClick={() => window.open('https://wa.me/5511950141570?text=Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20Kit%20de%20Atividades%20para%20o%20Desenvolvimento%20da%20Grafomotricidade%20Infantil', '_blank')}
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                        </svg>
                        Dúvidas? Fale no WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={restartQuiz}
                  className="flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  Refazer Quiz
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <UpgradeDialog 
        showUpgradeDialog={showUpgradeDialog} 
        setShowUpgradeDialog={setShowUpgradeDialog} 
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/logo-kit.png" 
                alt="Kit Logo" 
                className="w-20 h-20 object-contain pulse-continuous"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Quiz: Seu Filho(a) Precisa do Kit de Grafismo?
            </h1>
            <p className="text-gray-600">
              Descubra como está o desenvolvimento do seu pequeno(a) e o que você pode fazer para ajudá-lo(a)
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <Badge variant="secondary" className="flex items-center gap-1">
                <img 
                  src="/logo-kit.png" 
                  alt="Kit Logo" 
                  className="w-4 h-4 object-contain"
                />
                {score} pontos
              </Badge>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Question Card */}
          <Card className="mb-6 border-2 border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-bold text-sm">{currentQuestion + 1}</span>
                </div>
                {questions[currentQuestion].text}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showFeedback ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-blue-800 font-medium">{currentFeedback}</p>
                      <Button 
                        onClick={nextQuestion}
                        className="mt-4 bg-blue-600 hover:bg-blue-700"
                      >
                        {currentQuestion < questions.length - 1 ? "Próxima Pergunta" : "Ver Meu Resultado"}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <RadioGroup onValueChange={handleAnswer} className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={option.id} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label 
                        htmlFor={option.id} 
                        className="flex-1 cursor-pointer text-gray-700"
                      >
                        {option.text}
                      </Label>
                      <Badge variant="outline" className="text-xs">
                        +{option.points}
                      </Badge>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </CardContent>
          </Card>

          {/* Fun Elements */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-2xl">✏️</span>
            </div>
            <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0.2s'}}>
              <span className="text-2xl">📚</span>
            </div>
            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0.4s'}}>
              <span className="text-2xl">🌟</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>Quiz desenvolvido por especialistas em educação infantil</p>
            <p className="mt-1">Resultados baseados em observações clínicas e pedagógicas</p>
          </div>
        </div>
      </div>
    </>
  )
}

function Rocket({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1H5C3.89 1 3 1.89 3 3V7L9 13L12 10L19 17L21 15L14 8L21 9M12 11.5L6 17.5L3 14.5L5.5 12L3 9.5L6 7L8.5 9.5L11 7L13.5 9.5L12 11.5Z"/>
    </svg>
  )
}
