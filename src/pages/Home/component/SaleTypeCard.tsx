import { Pie, PieConfig, measureTextWidth } from '@ant-design/charts';
import classNames from 'classnames';
import { saleTypeInfoProps } from '../type';
import HomeCard from './HomeCard';

interface SaleTypeCardProps {
  saleTypeInfo: saleTypeInfoProps;
}

const SaleTypeCard = ({ saleTypeInfo }: SaleTypeCardProps) => {
  function renderStatistic(containerWidth: any, text: any, style: any) {
    const { width: textWidth, height: textHeight } = measureTextWidth(
      text,
      style,
    );
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)),
          ),
        ),
        1,
      );
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`;
  }

  const config: PieConfig = {
    appendPadding: 20,
    data: saleTypeInfo.data || [],
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.78,
    legend: {
      layout: 'horizontal',
      position: 'bottom',
      offsetY: 8,
    },
    label: {
      content: '',
    },
    statistic: {
      title: {
        offsetY: -4,
        style: {
          fontWeight: 'bold',
          fontSize: '32px',
        },
        customHtml: (container: any, view: any, datum: any) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : '';
          return renderStatistic(d, text, {});
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container: any, view: any, datum: any) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `${datum.value}` : ``;
          return renderStatistic(width, text, {});
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };

  return (
    <HomeCard className="col-span-2">
      <section className="font-bold h-[50px] pl-[20px] flex items-center">
        <span>销售额类别占比</span>
      </section>
      <section
        className={classNames('card-body')}
        style={{ height: '300px', margin: '20px' }}
      >
        <Pie {...config} />
      </section>
    </HomeCard>
  );
};

export default SaleTypeCard;
