"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Ruler } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SizeGuideModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Ruler className="h-4 w-4" />
          Guía de Talles
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Guía de Talles </DialogTitle>
          <DialogDescription>
            Encontrá tu talle perfecto con nuestras tablas de conversión y medidas detalladas
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="remeras" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="remeras">Remeras</TabsTrigger>
            <TabsTrigger value="pantalones">Pantalones</TabsTrigger>
            <TabsTrigger value="buzos">Buzos</TabsTrigger>
          </TabsList>

          {/* Remeras */}
          <TabsContent value="remeras" className="space-y-4">
            <div className="rounded-lg border p-4 bg-muted/50">
              <h3 className="font-semibold mb-3">Remeras y Camisetas</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Talle AR</th>
                      <th className="text-left py-2 px-2">Talle US</th>
                      <th className="text-left py-2 px-2">Talle EU</th>
                      <th className="text-left py-2 px-2">Pecho (cm)</th>
                      <th className="text-left py-2 px-2">Largo (cm)</th>
                      <th className="text-left py-2 px-2">Hombro (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-2 font-medium">XS</td>
                      <td className="py-2 px-2">S</td>
                      <td className="py-2 px-2">44-46</td>
                      <td className="py-2 px-2">88-92</td>
                      <td className="py-2 px-2">68-70</td>
                      <td className="py-2 px-2">42-44</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 font-medium">S</td>
                      <td className="py-2 px-2">M</td>
                      <td className="py-2 px-2">48-50</td>
                      <td className="py-2 px-2">92-96</td>
                      <td className="py-2 px-2">70-72</td>
                      <td className="py-2 px-2">44-46</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 font-medium">M</td>
                      <td className="py-2 px-2">L</td>
                      <td className="py-2 px-2">52-54</td>
                      <td className="py-2 px-2">96-100</td>
                      <td className="py-2 px-2">72-74</td>
                      <td className="py-2 px-2">46-48</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 font-medium">L</td>
                      <td className="py-2 px-2">XL</td>
                      <td className="py-2 px-2">56-58</td>
                      <td className="py-2 px-2">100-104</td>
                      <td className="py-2 px-2">74-76</td>
                      <td className="py-2 px-2">48-50</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 font-medium">XL</td>
                      <td className="py-2 px-2">XXL</td>
                      <td className="py-2 px-2">60-62</td>
                      <td className="py-2 px-2">104-108</td>
                      <td className="py-2 px-2">76-78</td>
                      <td className="py-2 px-2">50-52</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Pantalones */}
          <TabsContent value="pantalones" className="space-y-4">
            <div className="rounded-lg border p-4 bg-muted/50">
              <h3 className="font-semibold mb-3">Pantalones y Jeans</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Talle AR</th>
                      <th className="text-left py-2 px-2">Talle US</th>
                      <th className="text-left py-2 px-2">Talle EU</th>
                      <th className="text-left py-2 px-2">Cintura (cm)</th>
                      <th className="text-left py-2 px-2">Cadera (cm)</th>
                      <th className="text-left py-2 px-2">Largo (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-2 font-medium">38</td>
                      <td className="py-2 px-2">28</td>
                      <td className="py-2 px-2">44</td>
                      <td className="py-2 px-2">70-72</td>
                      <td className="py-2 px-2">88-90</td>
                      <td className="py-2 px-2">98-100</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 font-medium">40</td>
                      <td className="py-2 px-2">30</td>
                      <td className="py-2 px-2">46</td>
                      <td className="py-2 px-2">74-76</td>
                      <td className="py-2 px-2">92-94</td>
                      <td className="py-2 px-2">100-102</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 font-medium">42</td>
                      <td className="py-2 px-2">32</td>
                      <td className="py-2 px-2">48</td>
                      <td className="py-2 px-2">78-80</td>
                      <td className="py-2 px-2">96-98</td>
                      <td className="py-2 px-2">102-104</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 font-medium">44</td>
                      <td className="py-2 px-2">34</td>
                      <td className="py-2 px-2">50</td>
                      <td className="py-2 px-2">82-84</td>
                      <td className="py-2 px-2">100-102</td>
                      <td className="py-2 px-2">104-106</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 font-medium">46</td>
                      <td className="py-2 px-2">36</td>
                      <td className="py-2 px-2">52</td>
                      <td className="py-2 px-2">86-88</td>
                      <td className="py-2 px-2">104-106</td>
                      <td className="py-2 px-2">106-108</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Buzos */}
          <TabsContent value="buzos" className="space-y-4">
            <div className="rounded-lg border p-4 bg-muted/50">
              <h3 className="font-semibold mb-3">Buzos y Camperas</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Talle AR</th>
                      <th className="text-left py-2 px-2">Talle US</th>
                      <th className="text-left py-2 px-2">Talle EU</th>
                      <th className="text-left py-2 px-2">Pecho (cm)</th>
                      <th className="text-left py-2 px-2">Largo (cm)</th>
                      <th className="text-left py-2 px-2">Manga (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-2 font-medium">XS</td>
                      <td className="py-2 px-2">S</td>
                      <td className="py-2 px-2">44-46</td>
                      <td className="py-2 px-2">92-96</td>
                      <td className="py-2 px-2">64-66</td>
                      <td className="py-2 px-2">60-62</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 font-medium">S</td>
                      <td className="py-2 px-2">M</td>
                      <td className="py-2 px-2">48-50</td>
                      <td className="py-2 px-2">96-100</td>
                      <td className="py-2 px-2">66-68</td>
                      <td className="py-2 px-2">62-64</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 font-medium">M</td>
                      <td className="py-2 px-2">L</td>
                      <td className="py-2 px-2">52-54</td>
                      <td className="py-2 px-2">100-104</td>
                      <td className="py-2 px-2">68-70</td>
                      <td className="py-2 px-2">64-66</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2 font-medium">L</td>
                      <td className="py-2 px-2">XL</td>
                      <td className="py-2 px-2">56-58</td>
                      <td className="py-2 px-2">104-108</td>
                      <td className="py-2 px-2">70-72</td>
                      <td className="py-2 px-2">66-68</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 font-medium">XL</td>
                      <td className="py-2 px-2">XXL</td>
                      <td className="py-2 px-2">60-62</td>
                      <td className="py-2 px-2">108-112</td>
                      <td className="py-2 px-2">72-74</td>
                      <td className="py-2 px-2">68-70</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="rounded-lg border p-4 bg-primary/5 mt-4">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            Cómo medir correctamente
          </h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>
              • <strong>Pecho:</strong> Medí la parte más ancha del pecho con la cinta horizontal
            </li>
            <li>
              • <strong>Cintura:</strong> Medí la parte más angosta del torso, arriba del ombligo
            </li>
            <li>
              • <strong>Cadera:</strong> Medí la parte más ancha de la cadera
            </li>
            <li>
              • <strong>Largo:</strong> Desde el hombro hasta el bajo de la prenda
            </li>
            <li>
              • <strong>Manga:</strong> Desde el hombro hasta la muñeca con el brazo relajado
            </li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            Todas las medidas son aproximadas. Si estás entre dos talles, te recomendamos elegir el mayor para mayor
            comodidad.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
